import React from 'react';
import { connect } from 'react-redux';

import FetchBoards from '../core/board/action/FetchBoards';
import { Dispatch } from '../core/Dispatch';

import injectSheet from 'react-jss';

const styles = {
  green: {
    color: 'green',
  },
  red: {
    color: 'red',
  },
};

class FetchBoardsButton extends React.Component<{ dispatch: Dispatch; classes: any }, { isGreen: boolean }> {
  public state = { isGreen: true };

  public render() {
    const { dispatch, classes } = this.props;

    return (
      <button
        className={this.state.isGreen ? classes.green : classes.red}
        onClick={() => {
          this.setState(({ isGreen }) => ({ isGreen: !isGreen }));

          dispatch(new FetchBoards());
        }}
      >
        FetchBoards
      </button>
    );
  }
}

const RedFetchBoardsButton = injectSheet(styles)(FetchBoardsButton);

export default connect()(RedFetchBoardsButton);
