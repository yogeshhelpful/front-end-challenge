import React from "react";
import { Link } from "react-router-dom";

let base = "https://app5m2.herokuapp.com";
// let base = "http://localhost:3000";
let model_base = base + "/models";
  class ViewDetails extends React.Component {

    constructor(props){
        super(props);
        this.state ={};
        this.getList = this.getList.bind(this);
    }

    getList( id) {
        this.setState(
          {
            singledata: false,
          },
          () => {
            fetch(model_base + "/" + id)
              .then((res) => res.json())
              .then((result) => {
                this.setState({
                  singledata: result,
                });
              });
          }
        );
      }

      


    componentDidMount(){
        console.log(this.props.match.params.id);
        this.getList(this.props.match.params.id);
    }

    render(){
        console.log(this.props.match.params.id)
        if(!this.state.singledata)

        return 'loading...';
        let singledata = this.state.singledata;
        return (
            <React.Fragment>
               <div className="container">
               <div className="m-3">
                    <Link to="/" className="btn-sm btn-warning m-3">Go Back</Link>
                </div>
                <ul className="list-group">
                    <li className="text-left list-group-item">
                        <span className="badge">{singledata.id}</span>
                        ID
                    </li>
                    <li className="text-left list-group-item">
                        <span className="badge">
                        {singledata.is_moderated ? "Yes" : "No"}
                        </span>
                        Moderated?
                    </li>
                    <li className="text-left list-group-item">
                        <span className="badge">{singledata.avatar}</span>
                        Avatar URL
                    </li>
                    <li className="text-left list-group-item">
                        <span className="badge">{singledata.age}</span>
                        Age
                    </li>
                    <li className="text-left list-group-item">
                        <span className="badge">{singledata.eyes}</span>
                        Eyes
                    </li>
                    <li className="text-left list-group-item">
                        <span className="badge">{singledata.name}</span>
                        Name
                    </li>
                    <li className="text-left list-group-item">
                        <span className="badge">{singledata.gender}</span>
                        Gender
                    </li>
                    <li className="text-left list-group-item">
                        <span className="badge">{singledata.email}</span>
                        E-mail
                    </li>
                    <li className="text-left list-group-item">
                        <span className="badge">{singledata.created_at}</span>
                        Created At
                    </li>
                    <li className="text-left list-group-item">
                        <span className="badge">
                        {singledata.tags
                            ? singledata.tags.join(", ")
                            : ""}
                        </span>
                        Tags
                    </li>
                </ul>
                    
              </div>
            </React.Fragment>
          );
    }


  }
 

export default ViewDetails;

