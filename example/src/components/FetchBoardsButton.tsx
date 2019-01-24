import Button from '@material-ui/core/Button';
import React from 'react';
import { connect } from 'react-redux';

import FetchBoards from '../core/board/action/FetchBoards';
import { Dispatch } from '../core/Dispatch';

class FetchBoardsButton extends React.Component<{ dispatch: Dispatch }, {}> {
  public render() {
    const { dispatch } = this.props;

    return (
      <Button variant="contained" color="primary" onClick={() => dispatch(new FetchBoards())}>
        FetchBoards
      </Button>
    );
  }
}

export default connect()(FetchBoardsButton);
