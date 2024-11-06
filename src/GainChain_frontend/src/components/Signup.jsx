import React from 'react';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBIcon, MDBRow, MDBCol, MDBCheckbox } from 'mdb-react-ui-kit';
import './css/Signup.css';

function Signup() {
  // Handle II Authentication here (placeholder for now)
  const handleIIAuth = () => {
    // You can trigger II authentication API call here
    console.log("Initiate Internet Identity Login");
  };

  return (
    <MDBContainer fluid className="my-5">
      <MDBRow className="g-0 align-items-center">
        <MDBCol col="6">
          <MDBCard
            className="my-5 cascading-right"
            style={{
              background: 'hsla(0, 0%, 100%, 0.75)', 
              backdropFilter: 'blur(15px)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            <MDBCardBody className="p-5 shadow-5 text-center">
              <h2 className="fw-bold mb-5 text-orange">Sign up now</h2>
              <a href="/login">Already have an account?LOGIN</a>
              <MDBRow>
                <MDBCol col="6">
                  <MDBInput wrapperClass="mb-4" label="First name" id="form1" type="text" />
                </MDBCol>

                <MDBCol col="6">
                  <MDBInput wrapperClass="mb-4" label="Last name" id="form2" type="text" />
                </MDBCol>
              </MDBRow>

              <MDBInput wrapperClass="mb-4" label="Email" id="form3" type="email" />
              <MDBInput wrapperClass="mb-4" label="Password" id="form4" type="password" />

              <div className="d-flex justify-content-center mb-4">
                <MDBCheckbox name="flexCheck" value="" id="flexCheckDefault" label="Subscribe to our newsletter" />
              </div>

              {/* Internet Identity button */}
              <MDBBtn className="w-100 mb-4" size="md" onClick={handleIIAuth} style={{ backgroundColor: '#ff6f00' }}>
                Sign up with Internet Identity
              </MDBBtn>

              <MDBBtn className="w-100 mb-4" size="md" style={{ backgroundColor: '#ff6f00' }}>
                Sign up
              </MDBBtn>

              <div className="text-center">
                <p>or sign up with:</p>

                <MDBBtn tag="a" color="none" className="mx-3" style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon="facebook-f" size="sm" />
                </MDBBtn>

                <MDBBtn tag="a" color="none" className="mx-3" style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon="twitter" size="sm" />
                </MDBBtn>

                <MDBBtn tag="a" color="none" className="mx-3" style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon="google" size="sm" />
                </MDBBtn>

                <MDBBtn tag="a" color="none" className="mx-3" style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon="github" size="sm" />
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol col="6">
          <img
            src="../images/aiimage.jpg"
            className="w-100 rounded-4 shadow-4"
            alt="AI themed image"
            fluid
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Signup;
