import React from "react";

function DeleteModel(props) {
  const modalIdentifier = "delete" + props.elementId;
  const dataTarget = "#" + modalIdentifier;
  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-danger btn-sm"
        data-toggle="modal"
        data-target={dataTarget}
        onClick={(e) => props.getList(e, props.elementId)}
      >
        Delete
      </button>
      <div
        className="modal fade"
        id={modalIdentifier}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-title" id="exampleModalLabel">
                Delete Model
              </span>
              <button type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <h3>Are you sure? </h3>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={(event) => props.deleteList(event, props.elementId)}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default DeleteModel;
