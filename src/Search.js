import React from "react";
import _ from "lodash";
import { baseUrl, version, routers } from "./shared/constants";
import axios from "axios";
import {
  Grid,
  MenuItem,
  TextField,
  Select,
  Typography,
  Button,
  FormControl,
  TablePagination,
} from "@mui/material";
import { lineHeight } from "@mui/system";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      associateId: "",
      skillId: "Select",
      skillDetails: [],
      searchResult: [],
      skillTracker: [],
      nameError: false,
      associateIdError: false,
      skillIdError: false,
      page: 0,
      rowsPerPage: 5,
      totalRecords: 0,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  }

  async handleChangePage(event, newPage) {
    event.stopPropagation();
    const skill = this.pagination(
      this.state.searchResult,
      newPage,
      this.state.rowsPerPage
    );
    this.setState({ page: newPage, skillTracker: skill });
  }

  pagination(array, pageIndex, pageSize) {
    const first = pageIndex * pageSize;
    const last = pageIndex * pageSize + pageSize;
    return array.filter((_, index) => {
      return first <= index && index < last;
    });
  }
  async handleChangeRowsPerPage(event) {
    const skill = _.slice(
      this.state.searchResult,
      0,
      parseInt(event.target.value)
    );
    this.setState({
      rowsPerPage: parseInt(event.target.value),
      page: 0,
      skillTracker: skill,
    });
  }

  async componentDidMount() {
    const url = `${baseUrl}/${routers.skillDetail}`;
    const response = await axios.get(url);
    this.setState({ skillDetails: response.data });
  }

  async onChange(e) {
    const id =
      _.isNil(e.target.id) || _.isEmpty(e.target.id) ? "skillId" : e.target.id;
    const value = _.eq(id, "skillId")
      ? _.isEmpty(e.target.innerText)
        ? "Select"
        : e.target.innerText
      : e.target.value;
    this.setState({
      [id]: value,
      associateIdError: false,
      nameError: false,
      skillIdError: false,
    });
  }

  async handleSearch(e) {
    const { admin } = routers;
    let id = _.isNil(e.target.name) ? "skillId" : e.target.name;
    const searchValue = this.state[id];
    this.setState({
      associateIdError: false,
      nameError: false,
      skillIdError: false,
    });
    if (_.isEmpty(searchValue) || _.eq(searchValue, "Select")) {
      const key = `${id}Error`;
      this.setState({ [key]: true });
    } else {
      if (_.eq(id, "skillId")) {
        id = "skillname";
        this.setState({ name: "", associateId: "" });
      } else if (_.eq(id, "name")) {
        id = "name";
        this.setState({ associateId: "", skillId: "Select" });
      } else {
        id = "associateid";
        this.setState({ name: "", skillId: "Select" });
      }
      const url = `${baseUrl}/${version}/${admin}/${id}/${searchValue}`;
      const response = await axios.get(url);
      console.log(response);
      this.setState({
        searchResult: response.data,
        skillTracker: _.slice(response.data, 0, this.state.rowsPerPage),
        totalRecords: response.data.length,
      });
    }
  }

  render() {
    return (
      <div>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          rowSpacing={3}
          style={{ paddingTop: "25px" }}
        >
          <Grid item xl={12} lg={12} xs={12} sm={12} md={12}></Grid>
          <Grid
            item
            xl={12}
            lg={12}
            xs={12}
            sm={12}
            md={12}
            style={{
              background: "rgb(227, 256, 241)",
              color: "black",
              padding: "10px 20px",
            }}
          >
            <Typography variant="h6">Skill Tracker Search</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          rowSpacing={3}
          style={{ paddingTop: "26px" }}
        >
          <Grid item xl={12} lg={12} xs={12} sm={12} md={12}>
            <Grid
              container
              direction="row"
              columnSpacing={2}
              rowSpacing={1}
              justifyContent="flex-end"
            >
              <Grid item xl={2} lg={2} xs={2} sm={2} md={2}>
                {" "}
              </Grid>
              <Grid item xl={3} lg={3} xs={3} sm={3} md={3}>
                <TextField
                  id="name"
                  onChange={(e) => this.onChange(e)}
                  style={{ width: "300px" }}
                  value={this.state.name}
                  size="small"
                  variant="outlined"
                />
                {this.state.nameError ? (
                  <Typography
                    style={{ fontSize: "small", color: "red" }}
                    id="nameError"
                  >
                    Please enter name
                  </Typography>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xl={7} lg={7} xs={7} sm={7} md={7}>
                <Button
                  id="btnName"
                  name="name"
                  onClick={(e) => this.handleSearch(e)}
                  variant="contained"
                  style={{
                    textTransform: "none",
                    width: "25%",
                    background: "#04aa6d",
                  }}
                >
                  Name
                </Button>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              columnSpacing={2}
              rowSpacing={1}
              justifyContent="flex-end"
              style={{ paddingTop: "10px" }}
            >
              <Grid item xl={2} lg={2} xs={2} sm={2} md={2}>
                {" "}
              </Grid>
              <Grid item xl={3} lg={3} xs={3} sm={3} md={3}>
                <TextField
                  id="associateId"
                  style={{ width: "300px" }}
                  onChange={(e) => this.onChange(e)}
                  value={this.state.associateId}
                  size="small"
                  variant="outlined"
                />
                {this.state.associateIdError ? (
                  <Typography
                    style={{ fontSize: "small", color: "red" }}
                    id="associateIdError"
                  >
                    Please enter associate id
                  </Typography>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xl={7} lg={7} xs={7} sm={7} md={7}>
                <Button
                  id="btnId"
                  name="associateId"
                  variant="contained"
                  onClick={(e) => this.handleSearch(e)}
                  style={{
                    textTransform: "none",
                    width: "25%",
                    background: "#04aa6d",
                  }}
                >
                  Associate ID
                </Button>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              columnSpacing={2}
              rowSpacing={1}
              justifyContent="flex-end"
              style={{ paddingTop: "10px" }}
            >
              <Grid item xl={2} lg={2} xs={2} sm={2} md={2}>
                {" "}
              </Grid>
              <Grid item xl={3} lg={3} xs={3} sm={3} md={3}>
                <FormControl variant="outlined">
                  <Select
                    id="skillIds"
                    value={this.state.skillId}
                    onClick={(e) => this.onChange(e)}
                    SelectDisplayProps={{
                      style: { paddingTop: 8, paddingBottom: 8 },
                    }}
                    style={{ width: "300px" }}
                  >
                    <MenuItem value="Select">Select</MenuItem>
                    {this.state.skillDetails &&
                      _.size(this.state.skillDetails) > 0 &&
                      this.state.skillDetails.map((skill) => {
                        return (
                          <MenuItem
                            key={skill.skillDetailId}
                            value={skill.skillName}
                          >
                            {skill.skillName}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
                {this.state.skillIdError ? (
                  <Typography
                    style={{ fontSize: "small", color: "red" }}
                    id="skillIdError"
                  >
                    Please select skill id
                  </Typography>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xl={7} lg={7} xs={7} sm={7} md={7}>
                <Button
                  id="skillId"
                  name="skillId"
                  variant="contained"
                  onClick={(e) => this.handleSearch(e)}
                  style={{
                    textTransform: "none",
                    width: "25%",
                    background: "#04aa6d",
                  }}
                >
                  Skill
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          xs={12}
          rowSpacing={1}
        >
          {this.state.searchResult && _.size(this.state.searchResult) > 0 && (
            <Grid item xs={12} style={{ paddingTop: "20px" }}>
              <Typography variant="h6">Search Result</Typography>
              <hr></hr>
            </Grid>
          )}
          {this.state.searchResult.length === 0 && (
            <Grid
              item
              xs={12}
              style={{ paddingTop: "30px", textAlign: "left", color: "red" }}
            >
              <Typography variant="h6">No Records found</Typography>
            </Grid>
          )}
          <Grid
            id="searchResult"
            container
            xs={12}
            direction="row"
            style={{ paddingTop: "20px" }}
            justifyContent="space-around"
          >
            {this.state.skillTracker &&
              _.size(this.state.skillTracker) > 0 &&
              this.state.skillTracker.map((result) => {
                return (
                  <Grid
                    className="rowContainer"
                    container
                    xs={12}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-around"
                  >
                    <Grid
                      className="profileContainer"
                      container
                      xs={3}
                      direction="row"
                      justifyContent="space-around"
                      style={{
                        border: "1px solid black",
                        lineHeight: "1.6",
                        textIndent: "10px",
                      }}
                    >
                      <Grid
                        item
                        xs={4}
                        style={{
                          borderBottom: "1px solid black",
                          borderRight: "1px solid black",
                          backgroundColor: "lightgray",
                        }}
                      >
                        Name
                      </Grid>
                      <Grid
                        item
                        className="name-result"
                        xs={8}
                        style={{ borderBottom: "1px solid black" }}
                      >
                        {result.name}
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          borderBottom: "1px solid black",
                          borderRight: "1px solid black",
                          backgroundColor: "lightgray",
                        }}
                      >
                        ID
                      </Grid>
                      <Grid
                        item
                        xs={8}
                        style={{ borderBottom: "1px solid black" }}
                      >
                        {result.associateID}
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          borderBottom: "1px solid black",
                          borderRight: "1px solid black",
                          backgroundColor: "lightgray",
                        }}
                      >
                        Email
                      </Grid>
                      <Grid
                        item
                        xs={8}
                        style={{ borderBottom: "1px solid black" }}
                      >
                        {result.email}
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          borderRight: "1px solid black",
                          backgroundColor: "lightgray",
                        }}
                      >
                        Mobile
                      </Grid>
                      <Grid item xs={8}>
                        {result.mobile}
                      </Grid>
                    </Grid>
                    {_.some(
                      result.userTechnicalSkillDetails,
                      (x) => x.isTechnical
                    ) ? (
                      <Grid
                        className="techContainer"
                        container
                        xs={3}
                        style={{
                          borderTop: "1px solid black",
                          borderRight: "1px solid black",
                          borderLeft: "1px solid black",
                          lineHeight: "1.6",
                          textIndent: "10px",
                        }}
                      >
                        {result.userTechnicalSkillDetails &&
                          _.size(result.userTechnicalSkillDetails) > 0 &&
                          _.filter(
                            result.userTechnicalSkillDetails,
                            (x) => x.isTechnical
                          ).map((tech) => {
                            return (
                              <Grid container>
                                <Grid
                                  item
                                  xs={8}
                                  style={{
                                    borderBottom: "1px solid black",
                                    borderRight: "1px solid black",
                                    backgroundColor: "lightgray",
                                  }}
                                >
                                  {tech.skillName}
                                </Grid>
                                <Grid
                                  item
                                  xs={4}
                                  style={{ borderBottom: "1px solid black" }}
                                >
                                  {tech.expertiseLevel}
                                </Grid>
                              </Grid>
                            );
                          })}
                      </Grid>
                    ) : (
                      <Grid container xs={3}></Grid>
                    )}
                    {_.some(
                      result.userTechnicalSkillDetails,
                      (x) => !x.isTechnical
                    ) ? (
                      <Grid
                        className="nonTechContainer"
                        container
                        xs={3}
                        style={{
                          borderTop: "1px solid black",
                          borderRight: "1px solid black",
                          borderLeft: "1px solid black",
                          lineHeight: "1.6",
                          textIndent: "10px",
                        }}
                      >
                        {result.userTechnicalSkillDetails &&
                          _.size(result.userTechnicalSkillDetails) > 0 &&
                          _.filter(
                            result.userTechnicalSkillDetails,
                            (x) => !x.isTechnical
                          ).map((tech) => {
                            return (
                              <Grid container>
                                <Grid
                                  item
                                  xs={8}
                                  style={{
                                    borderBottom: "1px solid black",
                                    borderRight: "1px solid black",
                                    backgroundColor: "lightgray",
                                  }}
                                >
                                  {tech.skillName}
                                </Grid>
                                <Grid
                                  item
                                  xs={4}
                                  style={{ borderBottom: "1px solid black" }}
                                >
                                  {tech.expertiseLevel}
                                </Grid>
                              </Grid>
                            );
                          })}
                      </Grid>
                    ) : (
                      <Grid container xs={3}></Grid>
                    )}
                    <Grid
                      container
                      xs={12}
                      direction="row"
                      justifyContent="space-around"
                      style={{ margin: "15px" }}
                    >
                      <Grid
                        item
                        xs={12}
                        style={{
                          paddingBottom: "5px",
                          borderBottom: "1px solid grey",
                        }}
                      ></Grid>
                    </Grid>
                  </Grid>
                );
              })}
          </Grid>
          {this.state.searchResult && _.size(this.state.searchResult) > 0 && (
            <div style={{ paddingBottom: "25px" }}>
              <TablePagination
                component="div"
                count={this.state.searchResult.length}
                page={this.state.page}
                onPageChange={this.handleChangePage}
                rowsPerPage={this.state.rowsPerPage}
                onRowsPerPageChange={this.handleChangeRowsPerPage}
              />
            </div>
          )}
        </Grid>
      </div>
    );
  }
}

export default Search;
