// src/IssueComponents/IssueType.js
import React, { Component } from 'react';
import './IssuesComponents.css'; 
import { fetchTicketTypes, deleteTicketType, updateTicketType, addTicketType } from '../../Service'; 

class IssueTypes extends Component {
  state = {
    ticketTypes: [],
    showEditPopup: false,
    showAddPopup: false,
    currentIssue: null,
    editedName: '',
    editedDescription: '',
    newIssueName: '',
    newIssueDescription: '',
    successMessage: '',
    showPopup: false,
    successId: 0, // To track the success status
    loading: false, // Loading state
  };

  async componentDidMount() {
    await this.loadTicketTypes();
  }

  loadTicketTypes = async () => {
    this.setState({ loading: true }); // Start loading
    try {
      const data = await fetchTicketTypes();
      this.setState({ ticketTypes: data.result });
    } catch (error) {
      console.error('Error fetching ticket types:', error);
    } finally {
      this.setState({ loading: false }); // End loading
    }
  };

  handleEdit = (issue) => {
    this.setState({
      showEditPopup: true,
      currentIssue: issue,
      editedName: issue.name,
      editedDescription: issue.description,
    });
  };

  handleEditSubmit = async () => {
    const { currentIssue, editedName, editedDescription } = this.state;

    try {
      await updateTicketType({
        id: currentIssue.id,
        name: editedName,
        description: editedDescription,
      });

      this.setState(prevState => ({
        ticketTypes: prevState.ticketTypes.map(issue =>
          issue.id === currentIssue.id
            ? { ...issue, name: editedName, description: editedDescription }
            : issue
        ),
        showEditPopup: false,
        successMessage: `${editedName} updated successfully!`,
        showPopup: true,
        successId: 1, // Success ID for green message
      }));

      setTimeout(() => {
        this.setState({ showPopup: false, successMessage: '', successId: 0 });
      }, 1000);
    } catch (error) {
      console.error('Error updating issue type:', error);
    }
  };

  handleDelete = async (ticketTypeId) => {
    if (window.confirm("Are you sure you want to delete this issue type?")) {
      try {
        const deletedIssue = this.state.ticketTypes.find(issue => issue.id === ticketTypeId);
        await deleteTicketType(ticketTypeId);
        this.setState(prevState => ({
          ticketTypes: prevState.ticketTypes.filter(issue => issue.id !== ticketTypeId),
          successMessage: `${deletedIssue.name} deleted successfully!`,
          showPopup: true,
          successId: 1, // Success ID for green message
        }));

        setTimeout(() => {
          this.setState({ showPopup: false, successMessage: '', successId: 0 });
        }, 1000);
      } catch (error) {
        console.error('Error deleting issue type:', error);
      }
    }
  };

  handleAdd = async () => {
    const { newIssueName, newIssueDescription } = this.state;

    // Optimistically update the UI
    const newIssue = {
      id: Date.now(), // Using a temporary ID
      name: newIssueName,
      description: newIssueDescription,
    };

    this.setState(prevState => ({
      ticketTypes: [...prevState.ticketTypes, newIssue],
      showAddPopup: false,
      newIssueName: '',
      newIssueDescription: '',
      successMessage: `${newIssueName} added successfully!`,
      showPopup: true,
      successId: 1, // Success ID for green message
    }));

    try {
      const response = await addTicketType({
        name: newIssueName,
        description: newIssueDescription,
      });

      // If the response is successful, update the new issue with the actual data from the response
      if (response.isSuccess === 1) {
        this.setState(prevState => ({
          ticketTypes: prevState.ticketTypes.map(issue =>
            issue.id === newIssue.id ? response.result : issue
          ),
          successMessage: `${response.result.name} added successfully!`,
        }));
      } else if (response.isSuccess === 2) {
        this.setState({
          showAddPopup: false,
          successMessage: response.message,
          showPopup: true,
          successId: 2, // Error ID for red message
        });
      }
    } catch (error) {
      console.error('Error adding issue type:', error);
      // Optionally revert the optimistic update if the API call fails
      this.setState(prevState => ({
        ticketTypes: prevState.ticketTypes.filter(issue => issue.id !== newIssue.id),
        successMessage: 'Failed to add issue type. Please try again.',
        showPopup: true,
        successId: 2, // Error ID for red message
      }));
    }

    // Hide the popup after a timeout
    setTimeout(() => {
      this.setState({ showPopup: false, successMessage: '', successId: 0 });
    }, 3000);
  };

  render() {
    const { ticketTypes, loading, showPopup, successMessage, showEditPopup, editedName, editedDescription, showAddPopup, newIssueName, newIssueDescription, successId } = this.state;

    return (
      <div className="issues-container">
        <div>
          <div className='issues-header'>
            <h5>Issue Types</h5>
            <button onClick={() => this.setState({ showAddPopup: true })}>Add Issue Types</button>
          </div>
        </div>

        {/* Loading Indicator */}
        {loading && <div className="loading-indicator">Loading...</div>}

        {/* Popup for success message */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <h6 style={{ color: successId === 1 ? 'green' : 'red' }}>{successMessage}</h6>
            </div>
          </div>
        )}

        {/* Edit Popup */}
        {showEditPopup && (
          <div className="popup-overlay">
            <div className="popup" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
              <h5>Edit Issue</h5>
              <div align="left">
                <h6><label align="left"><strong>Name</strong></label></h6>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => this.setState({ editedName: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>
              <br />
              <div align="left">
                <h6><label align="left"><strong>Description</strong></label></h6>
                <textarea
                  value={editedDescription}
                  onChange={(e) => this.setState({ editedDescription: e.target.value })}
                  style={{ width: '100%', height: '80px' }}
                />
              </div>
              <button onClick={this.handleEditSubmit}>Edit</button>
              <button onClick={() => this.setState({ showEditPopup: false })}>Cancel</button>
            </div>
          </div>
        )}

        {/* Add Popup */}
        {showAddPopup && (
          <div className="popup-overlay">
            <div className="popup" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
              <h5>Add Issue Type</h5>
              <div align="left">
                <h6><label align="left"><strong>Name</strong></label></h6>
                <input
                  type="text"
                  value={newIssueName}
                  onChange={(e) => this.setState({ newIssueName: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>
              <div align="left">
                <h6><label align="left"><strong>Description</strong></label></h6>
                <textarea
                  value={newIssueDescription}
                  onChange={(e) => this.setState({ newIssueDescription: e.target.value })}
                  style={{ width: '100%', height: '80px' }}
                />
              </div>
              <button onClick={this.handleAdd}>Add</button>
              <button onClick={() => this.setState({ showAddPopup: false })}>Cancel</button>
            </div>
          </div>
        )}

        <table className="table">
          <thead>
            <tr>
              <td scope="col">Name</td>
              <td scope="col">Actions</td>
            </tr>
          </thead>
          <tbody>
            {ticketTypes.length > 0 ? (
              ticketTypes.map((issue) => (
                <tr key={issue.id}>
                  <td>
                    <h6>{issue.name}</h6>
                    <div>{issue.description}</div>
                  </td>
                  <td>
                    <span
                      className="action-link"
                      onClick={() => this.handleEdit(issue)}
                    >
                      Edit
                    </span>
                    <span
                      className="action-link"
                      onClick={() => this.handleDelete(issue.id)}
                      style={{ marginLeft: '10px' }}
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No issue types available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default IssueTypes;
