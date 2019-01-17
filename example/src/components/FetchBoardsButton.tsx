import React from 'react';
import { connect } from 'react-redux';

import FetchBoards from '../core/board/action/FetchBoards';
import { Dispatch } from '../core/Dispatch';

import injectSheet from 'react-jss';

const styles = {
  button: {
    color: 'red',
  },
};

const FetchBoardsButton = ({ dispatch, classes }: { dispatch: Dispatch; classes: any }) => (
  <button
    className={classes.button}
    onClick={() => {
      dispatch(new FetchBoards());
    }}
  >
    FetchBoards
  </button>
);

const RedFetchBoardsButton = injectSheet(styles)(FetchBoardsButton);

export default connect()(RedFetchBoardsButton);
