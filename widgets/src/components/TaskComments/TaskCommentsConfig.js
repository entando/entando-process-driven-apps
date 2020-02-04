/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button, HelpBlock, Row, Col } from 'patternfly-react';

import withAuth from 'components/common/authentication/withAuth';
import { getConnections } from 'api/pda/connections';
import { getProcesses } from 'api/pda/processes';
import { getPageWidget, putPageWidget } from 'api/app-builder/pages';
import ErrorNotification from 'components/common/ErrorNotification';

import 'patternfly-react/dist/css/patternfly-react.css';
import 'patternfly/dist/css/patternfly.css';
import 'patternfly/dist/css/patternfly-additions.css';

class TaskCommentsConfig extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sourceList: [],
      processList: [],
      knowledgeSource: '',
      selectedProcess: '',
      errorMessage: '',
    };

    this.onChangeKnowledgeSource = this.onChangeKnowledgeSource.bind(this);
    this.onChangeProcess = this.onChangeProcess.bind(this);
    this.closeNotification = this.closeNotification.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  async componentDidMount() {
    try {
      const { frameId, pageCode } = this.props;

      // getting list of Kie server connections
      const sourceList = await getConnections();
      this.setState({ sourceList: sourceList.payload });

      // getting existing configs
      const pageWidgetsConfigs = await getPageWidget(pageCode, frameId, 'TASK_COMMENTS');

      const configs = pageWidgetsConfigs.payload && pageWidgetsConfigs.payload.config;
      if (configs && configs.knowledgeSource) {
        this.onChangeKnowledgeSource(configs.knowledgeSource, () => {
          if (configs.process) {
            this.onChangeProcess(configs.process);
          }
        });
      }
    } catch (error) {
      this.handleError(error.message);
    }
  }

  onChangeKnowledgeSource(e, cb = () => {}) {
    const knowledgeSource = e.target ? e.target.value : e;
    this.setState({ knowledgeSource });

    getProcesses(knowledgeSource)
      .then(data => {
        this.setState({ processList: data.payload });
        cb();
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  onChangeProcess(e, cb = () => {}) {
    const selectedProcess = e.target ? e.target.value : e;
    this.setState({ selectedProcess });

    cb();
  }

  closeNotification = () => {
    this.setState({ errorMessage: '' });
  };

  handleError(errorMessage) {
    this.setState({ errorMessage });
  }

  async handleSave() {
    const { frameId, pageCode, widgetCode } = this.props;
    const { knowledgeSource, selectedProcess } = this.state;
    const [, containerId] = selectedProcess.split('@');

    const body = JSON.stringify({
      code: widgetCode,
      config: {
        knowledgeSource,
        process: selectedProcess,
        containerId,
      },
    });

    try {
      const response = await putPageWidget(pageCode, frameId, body);
      console.log('Configs got saved', response);
    } catch (error) {
      this.handleError(error.message);
    }
  }

  render() {
    const {
      knowledgeSource,
      sourceList,
      processList = [],
      selectedProcess = '',
      errorMessage,
    } = this.state;

    return (
      <div>
        <ErrorNotification message={errorMessage} onClose={this.closeNotification} />
        <form>
          <Row>
            <Col xs={12}>
              <FormGroup controlId="connection">
                <ControlLabel>Knowledge Source</ControlLabel>
                <select
                  className="form-control"
                  value={knowledgeSource}
                  onChange={this.onChangeKnowledgeSource}
                >
                  <option value="">Select...</option>
                  {sourceList.map(source => (
                    <option key={source.name} value={source.name}>
                      {source.name}
                    </option>
                  ))}
                </select>
                <HelpBlock>Select one of the Kie server connections.</HelpBlock>
              </FormGroup>
              <FormGroup controlId="connection">
                <ControlLabel>Process</ControlLabel>
                <select
                  className="form-control"
                  value={selectedProcess}
                  onChange={this.onChangeProcess}
                >
                  <option value="">Select...</option>
                  {processList.map(process => (
                    <option
                      key={`${process['process-id']}@${process['container-id']}`}
                      value={`${process['process-id']}@${process['container-id']}`}
                    >
                      {`${process['process-name']} @ ${process['container-id']}`}
                    </option>
                  ))}
                </select>
                <HelpBlock>Select one BPM Process.</HelpBlock>
              </FormGroup>
            </Col>
          </Row>
          {selectedProcess && (
            <section>
              <Row>
                <Col xs={12} className="text-right">
                  <Button bsClass="btn" bsStyle="primary" onClick={this.handleSave}>
                    Save
                  </Button>
                </Col>
              </Row>
            </section>
          )}
        </form>
      </div>
    );
  }
}

TaskCommentsConfig.propTypes = {
  frameId: PropTypes.string.isRequired,
  widgetCode: PropTypes.string.isRequired,
  pageCode: PropTypes.string.isRequired,
};

export default withAuth(TaskCommentsConfig, ['connection-list', 'process-definition-list']);