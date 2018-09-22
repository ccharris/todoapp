import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import Header from "../components/Header";
import ToDoList from "../components/ToDoList";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    minHeight: "48px"
  }
});

class ToDoIndex extends Component {
  constructor() {
    super();
    this.state = {
      itemList: [],
      filteredItems: []
    };
  }

  componentDidMount() {
    let list = localStorage.getItem("list");
    try {
      list = JSON.parse(list);
      list !== null && this.setState({ itemList: list, filteredItems: list });
    } catch (e) {
      console.log("error", e);
    }
  }
  setLocalStorage = list => {
    localStorage.setItem("list", JSON.stringify(list));
  };
  submitItem = e => {
    e.preventDefault();
    let list = this.state.itemList;
    let tagArray = e.target.tags.value.split(",");
    let currentItem = {
      item: e.target.item.value,
      checked: false,
      tags: tagArray
    };
    list.push(currentItem);
    this.setState({ itemList: list, filteredItems: list });
    this.setLocalStorage(list);
    e.target.item.value = ''
    e.target.tags.value = ''
  };

  checkItem = (e, item) => {
    let newItems = this.state.itemList.map(todo => {
      todo === item ? (todo.checked = !todo.checked) : todo;
      return todo;
    });
    this.setState({ itemList: newItems, filteredItems: newItems });
    this.setLocalStorage(newItems);
  };

  deleteItem = (e, item) => {
    let newItems = this.state.itemList.filter(todo => todo !== item);
    this.setState({ itemList: newItems, filteredItems: newItems });
    this.setLocalStorage(newItems);
  };

  search = e => {
    let search = e.target.value;
    let newItems = this.state.itemList.filter(todo => {
      return todo.item.includes(search) ||
        todo.tags.find(tag => tag.includes(search))
        ? todo
        : null;
    });
    this.setState({ filteredItems: newItems });
  };

  deleteAllChecked = () => {
    let newItems = this.state.itemList.filter(todo => todo.checked === false);
    console.log(newItems);
    this.setState({ itemList: newItems, filteredItems: newItems });
    this.setLocalStorage(newItems);
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Header search={this.search} />
        {this.state.filteredItems.length > 0 && (
          <Fragment>
            <Button
              type="delete"
              variant="contained"
              size="small"
              color="secondary"
              className={classes.button}
              onClick={this.deleteAllChecked}
            >
              <DeleteIcon /> All Checked
            </Button>
            <ToDoList
              items={this.state.filteredItems}
              checkItem={this.checkItem}
              deleteItem={this.deleteItem}
            />
          </Fragment>
        )}
        <form onSubmit={this.submitItem} className={classes.form}>
          <Grid container spacing={16}>
            <Grid item xs={12} md={5}>
              <TextField
                id="new-item"
                label="New Item"
                placeholder="New Item"
                fullWidth
                margin="dense"
                variant="outlined"
                name="item"
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                id="tags"
                label="Tags: separate by comma"
                placeholder="Tags"
                fullWidth
                margin="dense"
                variant="outlined"
                name="tags"
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <Button
                type="submit"
                variant="outlined"
                size="large"
                color="secondary"
                className={classes.button}
              >
                +
              </Button>
            </Grid>
          </Grid>
        </form>
      </Fragment>
    );
  }
}

ToDoIndex.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ToDoIndex);
