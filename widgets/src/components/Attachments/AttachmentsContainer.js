/* eslint-disable no-console */
import { MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

import { DOMAINS, LOCAL } from 'api/constants';
import { getAttachments, saveAttachment, deleteAttachment } from 'api/pda/attachments';
import { Typography } from '@material-ui/core';
import { getPageWidget } from 'api/app-builder/pages';
import SimpleDialog from 'components/common/SimpleDialog';
import theme from 'theme';
import AttachmentsSkeleton from './AttachmentsSkeleton';
import AddAttachmentModal from './AddAttachmentModal';
import Attachment from './Attachment';

const styles = {
  footer: {
    textAlign: 'right',
  },
  empty: {
    border: 'solid 1px #eee',
    marginTop: 8,
    marginBottom: 2,
    background: 'white',
    borderRadius: 3,
    padding: 18,
    textAlign: 'center',
    height: 52,
  },
};

class AttachmentsContainer extends React.Component {
  state = {
    attachments: [],
    loading: true,
    dialogOpen: false,
    connection: '',
  };

  componentDidMount = async () => {
    const { serviceUrl } = this.props;

    if (!LOCAL) {
      // set the PDA domain to the URL passed via props
      DOMAINS.PDA = serviceUrl;
    }

    const config = await this.fetchConfigs();
    this.setState({ connection: config.knowledgeSource }, async () => {
      const attachments = await this.fetchAttachments();
      this.setState({ attachments, loading: false });
    });
  };

  fetchConfigs = async () => {
    const { pageCode, frameId } = this.props;

    try {
      const widgetConfigs = await getPageWidget(pageCode, frameId, 'ATTACHMENTS');
      if (widgetConfigs.errors.length) {
        throw widgetConfigs.errors[0];
      }
      if (!widgetConfigs.payload) {
        throw new Error('No configuration found for this widget');
      }

      const { config } = widgetConfigs.payload;
      return config;
    } catch (error) {
      this.handleError(error);
    }
    return {};
  };

  fetchAttachments = async () => {
    const { connection } = this.state;
    const { taskId } = this.props;

    let payload = [];

    try {
      const attachments = await getAttachments(connection, taskId);
      if (attachments.errors.length) {
        throw attachments.errors[0];
      }

      payload = attachments.payload;
    } catch (error) {
      if (!error.message.includes('404')) {
        this.handleError(error);
      }
    }
    return payload;
  };

  toggleDialog = () => {
    this.setState(state => ({ dialogOpen: !state.dialogOpen }));
  };

  handleUpload = async files => {
    const { connection } = this.state;
    const { taskId } = this.props;
    console.log('begin upload of files:');
    try {
      const responses = [];
      await files.forEach(async file => {
        responses.push(await saveAttachment(connection, taskId, file));
      });
      console.log('Uploaded!');
    } catch (error) {
      this.handleError(error);
    }

    console.log('end upload of files:');
  };

  handleDelete = item => async () => {
    const { connection } = this.state;
    const { taskId } = this.props;
    try {
      await deleteAttachment(connection, taskId, item.id);
      this.fetchAttachments();
    } catch (error) {
      this.handleError(error);
    }
    console.log(item);
  };

  handleError = error => {
    console.log(error);
  };

  render() {
    const { attachments, loading, dialogOpen, connection } = this.state;
    const { classes, taskId } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <div>
          <Typography variant="h3">Attachments</Typography>
          {loading ? (
            <AttachmentsSkeleton rows={3} />
          ) : attachments.length ? (
            <List>
              {attachments.map(item => (
                <Attachment
                  key={item.id}
                  item={item}
                  onDelete={this.handleDelete}
                  downloadLink={`/connections/${connection}/tasks/${taskId}/attachments`}
                />
              ))}
            </List>
          ) : (
            <div className={classes.empty}>
              <Typography>There is no attachment available for this task.</Typography>
            </div>
          )}
          <div className={classes.footer}>
            <Button variant="outlined" color="primary" onClick={this.toggleDialog}>
              Add
            </Button>
          </div>
        </div>
        <SimpleDialog
          title="Add new Attachment"
          open={dialogOpen}
          body={<AddAttachmentModal onUpload={this.handleUpload} onClose={this.toggleDialog} />}
          onClose={this.toggleDialog}
          maxWidth="md"
        />
      </ThemeProvider>
    );
  }
}

AttachmentsContainer.propTypes = {
  classes: PropTypes.shape({
    footer: PropTypes.string,
    empty: PropTypes.string,
  }),
  taskId: PropTypes.string.isRequired,
  serviceUrl: PropTypes.string,
  pageCode: PropTypes.string,
  frameId: PropTypes.string,
};

AttachmentsContainer.defaultProps = {
  classes: {},
  serviceUrl: '',
  pageCode: '',
  frameId: '',
};

export default withStyles(styles)(AttachmentsContainer);
