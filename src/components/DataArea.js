import React, { Component } from "react"
import Nav from "../components/Nav"
import DataTable from "../components/DataTable"
import API from "../utils/API"
import "../styles/DataArea.css"



export default class DataArea extends Component {
  state = {
    users: [{}],
    order: "descend",
    input: "",
    filteredUsers: [{}]
  }

  headings = [
    { name: "Image", width: "10%" },
    { name: "Name", width: "10%" },
    { name: "Phone", width: "20%" },
    { name: "Email", width: "20%" },
    { name: "DOB", width: "10%" }
  ]

  handleSort = heading => {
    if (this.state.order === "descend") {
      this.setState({
        order: "ascend"
      })
    } else {
      this.setState({
        order: "descend"
      })
    }

    const compareFnc = (a, b) => {
      if (this.state.order === "ascend") {
        // account for missing values
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        }
        // numerically
        else if (heading === "name") {
          return a[heading].first.localeCompare(b[heading].first);
        } else {
          return a[heading] - b[heading];
        }
      } else {
          console.log("Descending condition", a[heading])
          if (a[heading] === undefined) {
            console.log("Returning 1")
            return 1;
          } else if (b[heading] === undefined) {
            return -1;
          }
          else if (heading === "name") {
            return b[heading].first.localeCompare(a[heading].first);
          } else {
            return b[heading] - a[heading];
          }
      }
    }
    const sortedUsers = this.state.filteredUsers.sort(compareFnc);
    this.setState({ filteredUsers: sortedUsers });
  }

  handleSearchChange = event => {
    event.preventDefault()
    console.log(event.target.value);
    const filter = event.target.value;
    const filteredList = this.state.users.filter(item => {
      // merge data together, then see if user input is anywhere inside
      let values = Object.values(item).join("").toLowerCase();
      return values.indexOf(filter.toLowerCase()) !== -1;
    });
    this.setState({ filteredUsers: filteredList });
  }
  componentDidMount() {
    API.getUsers().then(results => {
      this.setState({users: results.data.results, filteredUsers: results.data.results})
    });
  }

  render() {
    return (
      <>
        <Nav handleSearchChange={this.handleSearchChange} />
        <div className="data-area">
          <DataTable
           // we will need to pass in props for headings, users, and handlesort here to DataTable
           headings={this.headings} handleSort={this.handleSort} users={this.state.filteredUsers}
          />
        </div>
      </>
    );
  }
}