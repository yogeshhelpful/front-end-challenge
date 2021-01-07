import React from "react";

function UpdateModel(props) {
  const modalIdentifier = "update" + props.elementId;
  const dataTarget = "#" + modalIdentifier;
  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-success btn-sm"
        data-toggle="modal"
        data-target={dataTarget}
        onClick={(e) => props.getList(e, props.elementId)}
      >
        Update
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
                Update Model
              </span>
              <button type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <input
                  type="text"
                  required
                  placeholder="name"
                  className="form-control"
                  name="name"
                  value={props.singledata.name}
                  onChange={props.handleChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  required
                  placeholder="email"
                  className="form-control"
                  name="email"
                  value={props.singledata.email}
                  onChange={props.handleChange}
                />
              </div>
            </div>
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
                onClick={(event) => props.updateList(event, props.elementId, modalIdentifier)}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UpdateModel;
