import ActionCell from 'components/common/Table/custom/ActionCell';
import CheckboxCell from 'components/common/Table/custom/CheckboxCell';
import { compareDates, compareNumbers, compareStrings } from 'components/common/Table/utils';

export const getType = (column, firstRow) => {
  let sortFunction = compareStrings;
  if (firstRow[column] instanceof Date) {
    sortFunction = compareDates;
  } else if (typeof firstRow[column] === 'number') {
    sortFunction = compareNumbers;
  }

  return sortFunction;
};

export const normalizeColumns = (columns, firstRow) => {
  const normalized = columns
    .filter(column => column.isVisible)
    .map(column => ({
      header: column.header,
      accessor: column.name,
      position: column.position,
      sortFunction: getType(column, firstRow),
    }));
  // order columns
  normalized.sort((a, b) => (a.position > b.position ? 1 : a.position < b.position ? -1 : 0));

  return normalized;
};

export const insertRowControls = (columns, options, { openDiagram, selectTask }) => {
  // find required fields according to options
  const requiredFields = options.reduce((obj, option) => {
    obj[option.key] = option.checked;
    return obj;
  }, {});

  const checkboxPanel = {
    header: '_checkbox',
    customCell: CheckboxCell(),
    styles: {
      position: 'sticky',
      left: 0,
      width: 20,
      zIndex: 100,
      borderRight: '1px solid #eee',
      paddingRight: 16,
      textAlign: 'center',
    },
  };

  const actionsPanel = {
    header: 'Actions',
    accessor: 'action',
    customCell: ActionCell(requiredFields, { openDiagram, selectTask }),
    styles: {
      position: 'sticky',
      right: 0,
      width: 20,
      zIndex: 100,
      borderLeft: '1px solid #eee',
      paddingLeft: 16,
      textAlign: 'center',
    },
  };

  // add action field
  return [checkboxPanel, ...columns, actionsPanel];
};

export const normalizeRows = rows =>
  rows.map(row => {
    const normalizedRow = {};
    Object.keys(row).forEach(key => {
      if (row[key] instanceof Object) {
        normalizedRow[key] = '';
      } else {
        normalizedRow[key] = String(row[key]);
      }
    });
    return normalizedRow;
  });

export const normalizeConfigColumns = columns =>
  columns.map((column, i) => ({
    name: column,
    position: i,
    isVisible: true,
  }));

export const normalizeConfigGroups = groups =>
  groups.map(group => ({
    label: group,
    key: group,
    checked: true,
  }));
