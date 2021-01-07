import React from "react";
// import CreateList from "./CreateList";
import Lists from "./Lists";
import ReactPaginate from "react-paginate";

let base = "https://app5m2.herokuapp.com";
// let base = "http://localhost:3000";
let model_base = base + "/models";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      alldata: [],
      search: "",
      page: 1,
      singledata: {
        title: "",
        author: "",
      },
    };
    this.getLists = this.getLists.bind(this);
    this.getList = this.getList.bind(this);
    
    // this.createList = this.createList.bind(this);
    this.updateList = this.updateList.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }



  getList(event,  id) {
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

  



  componentDidMount() {
    this.getLists();
  }
  doSearch(e) {
    e.preventDefault();
    this.setState(
      {
        page: 1,
      },
      this.getLists
    );
  }
  doSort(via) {
    this.setState(
      {
        page: 1,
        sort: via,
      },
      this.getLists
    );
  }

  handlePageClick(mm) {
    // console.log(mm);
    // console.log(mm.selected +, this.state.page);
    if (mm.selected + 1 == this.state.page) return;
    this.setState(
      {
        page: mm.selected + 1,
      },
      this.getLists
    );
  }

  getLists() {
    this.setState({ loading: true }, async () => {
      let via = "";
      if (this.state.sort) {
        via = "&_sort=name&_order=" + this.state.sort;
      }
      let search = "";
      if (this.state.search) {
        search = "&name_like=" + this.state.search;
      }
      let url =
        model_base + "?_page=" + this.state.page + "&_limit=20" + via + search;
      let response = await fetch(url);

      if (response.ok) {
        // if HTTP-status is 200-299
        // get the response body (the method explained below)
        // console.log(response.headers);
        let total = response.headers.get("x-total-count");
        console.log(total);
        let page_count = Math.ceil(total / 20);

        let result = await response.json();

        this.setState({
          loading: false,
          alldata: result,
          page_count: page_count,
        });
      } else {
        //alert("HTTP-Error: " + response.status);
      }

      //   fetch()
      //     .then(res => res.json())
      //     .then(result =>
      //       {

      //       }
      //     )
      //     .catch(console.log);
    });
  }

  handleChange(event) {
    var name = this.state.singledata.name;
    var email = this.state.singledata.email;
    if (event.target.name === "name") name = event.target.value;
    else email = event.target.value;
    let ss = this.state.singledata;
    ss.name = name;
    ss.email = email;
    this.setState({
      singledata: ss,
    });
  }


  updateList(event, id, dataTarget) {
    if(!this.state.singledata.name || !this.state.singledata.email)
    {
        alert("Please enter all fields.");
        return false;
    }
    // let el = document.getElementById(dataTarget);
    // el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  
    // $(dataTarget).modal('hide');
    fetch(model_base + "/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.singledata),
    })
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          singledata: {
            title: "",
            author: "",
          },
        });
        this.getLists();
      });
  }

  deleteList(event, id) {
    fetch(model_base + "/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          singledata: {
            title: "",
            author: "",
          },
        });
        this.getLists();
      });
  }

  render() {
    const listTable = this.state.loading ? (
      <span>Loading...Is usually slower than localhost...</span>
    ) : (
      <>
        <Lists
          alldata={this.state.alldata}
          singledata={this.state.singledata}
          getList={this.getList}
          updateList={this.updateList}
          deleteList={this.deleteList}
          handleChange={this.handleChange}
        />
        <ReactPaginate
          pageCount={this.state.page_count}
          initialPage={this.state.page - 1}
          onPageChange={this.handlePageClick.bind(this)}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </>
    );
    return (
      <div className="container">
        <span className="title-bar">
          {/* <CreateList
            singledata={this.state.singledata}
            createList={this.createList}
            handleChange={this.handleChange}
          /> */}

          <form
            className="search form-inline"
            onSubmit={(e) => {
              this.doSearch(e);
            }}
          >
            <div className="form-inline">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="search"
                  id="search"
                  value={this.state.search}
                  onChange={(e) => {
                    this.setState({
                      search: e.target.value,
                    });
                  }}
                />
                <button className="btn btn-sm btn-primary">Search </button>
              </div>
            </div>
          </form>

          <button
            type="button"
            onClick={() => {
              this.doSort("asc");
            }}
            className="btn m-3 btn-primary btn-sm"
          >
            Sort by Name - asc
          </button>
          <button
            type="button"
            onClick={() => {
              this.doSort("desc");
            }}
            className="btn m-3 btn-primary btn-sm"
          >
            Sort by Name - desc
          </button>
          {this.state.sort ? (
            <button
              type="button"
              onClick={() => {
                this.doSort("");
              }}
              className="btn m-3 btn-warning btn-sm"
            >
              Reset Sort
            </button>
          ) : (
            false
          )}
        </span>
        <br />
        {listTable}
      </div>
    );
  }
}

export default Home;
