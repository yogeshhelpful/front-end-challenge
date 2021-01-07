import React from "react";
import UpdateModel from "./UpdateModel";
import DeleteModel from "./DeleteModel";
import {
  Link
} from "react-router-dom";
// "id": "5dcc22a82b72d6f44cc217c0",
//       "is_moderated": true,
//       "avatar": "https://placeimg.com/200/280/people",
//       "age": 38,
//       "eyes": "green",
//       "name": "Jocelyn Miller",
//       "gender": "female",
//       "email": "jocelynmiller@snowpoke.com",
//       "created_at": "2017-08-16 06:08:23 ",
//       "tags": [
//         "consectetur",
//         "veniam",
//         "commodo",
//         "anim",
//         "culpa",
//         "ad",
//         "magna"
//       ]

function Lists(props) {
  var rows = [];
  props.alldata.forEach((element) => {
    rows.push(
      <div className="col-md-3 profile" key={element.id}>
        <div className="profile-sidebar">
          <div className="profile-userpic">
            <img src={element.avatar} className="img-responsive" alt="" />
          </div>
          <div className="profile-usertitle">
            <div className="profile-usertitle-name">{element.name}</div>
            <div className="profile-usertitle-job">{element.email}</div>
          </div>
          <div className="profile-userbuttons">
            <Link to={"/details/"+element.id} className="btn btn-primary btn-sm">
              View
            </Link>
            {/* <ViewModel
              elementId={element.id}
              singledata={props.singledata}
              getList={props.getList}
              updateList={props.updateList}
              handleChange={props.handleChange}
            /> */}
            <UpdateModel
              elementId={element.id}
              singledata={props.singledata}
              getList={props.getList}
              updateList={props.updateList}
              handleChange={props.handleChange}
            />
            <DeleteModel
              elementId={element.id}
              singledata={props.singledata}
              getList={props.getList}
              deleteList={props.deleteList}
            />
          </div>
        </div>
      </div>
    );
  });
  return <div className="row">{rows}</div>;
}

export default Lists;
