import React, { useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBModal, MDBModalBody, MDBModalHeader } from 'mdb-react-ui-kit';

const Profile = ({ user, projects }) => {
  const [modal, setModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const toggleModal = (project) => {
    setSelectedProject(project);
    setModal(!modal);
  };

  return (
    <MDBContainer>
      <MDBCard className="my-5">
        <MDBCardBody>
          <MDBRow>
            <MDBCol md="4">
              <MDBCardImage
                src={user.profilePicture || "defaultProfilePic.jpg"}
                alt={`${user.name}'s profile picture`}
                className="img-fluid rounded-circle"
              />
            </MDBCol>
            <MDBCol md="8">
              <MDBCardTitle>{user.name}</MDBCardTitle>
              <p>{user.bio}</p>
              <p><strong>Skills:</strong> {user.skills.join(', ')}</p>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>

      <h4>Projects</h4>
      <MDBRow>
        {projects.map((project) => (
          <MDBCol md="4" className="mb-4" key={project.id}>
            <MDBCard>
              <MDBCardImage src={project.image} alt={project.title} className="img-fluid" />
              <MDBCardBody>
                <MDBCardTitle>{project.title}</MDBCardTitle>
                <MDBBtn color="primary" onClick={() => toggleModal(project)}>View Details</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>

      <MDBModal isOpen={modal} toggle={() => toggleModal(null)}>
        <MDBModalHeader toggle={() => toggleModal(null)}>
          {selectedProject?.title}
        </MDBModalHeader>
        <MDBModalBody>
          <p><strong>Description:</strong> {selectedProject?.description}</p>
          <p><strong>Technologies:</strong> {selectedProject?.technologies.join(', ')}</p>
          <p><strong>Link:</strong> <a href={selectedProject?.link} target="_blank" rel="noopener noreferrer">{selectedProject?.link}</a></p>
        </MDBModalBody>
      </MDBModal>
    </MDBContainer>
  );
};

export default Profile;
