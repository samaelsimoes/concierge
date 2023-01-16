import { useKeycloak, withKeycloak } from "@react-keycloak/web";
import { FC, useState } from "react";
import loginIconImage from "../assets/login_icon.svg";
import { IconUser } from "../components/Navbar/Navbar.elements";

const LoginStub: FC = () => {

    const { keycloak } = useKeycloak()
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordError, setpasswordError] = useState("");
    const [emailError, setemailError] = useState("");
    const [show, setShow] = useState(false);

    const loginSubmit = () => {
        // e.preventDefault();
        keycloak.login()
    };

    return (
        <>
            <div className="Style-login" >
                <IconUser src={process.env.PUBLIC_URL + '/images/IconUsuario.png'} onClick={() => loginSubmit()} />
            </div>
            {/* <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-wish">
                <Modal.Header closeButton>
                    <Modal.Title id="modal-wish" >
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md" style={{ padding: '1rem' }}>
                                <form id="loginform" onSubmit={loginSubmit}>
                                    <div className="form-group form-floating input-group mb-3">
                                        <span className="input-group-text"> <IconUser /></span>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="EmailInput"
                                            name="EmailInput"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter email"
                                            onChange={(event) => setEmail(event.target.value)}
                                            style={{
                                                borderLeft: '0 inset',
                                                borderTop: '0',
                                                borderRight: '0',
                                            }}
                                        />
                                        <label style={{
                                            marginLeft: "4rem"
                                        }}>Email address</label>
                                        <small id="emailHelp" className="text-danger form-text">
                                            {emailError}
                                        </small>
                                    </div>
                                    <div className="form-group form-floating input-group mb-3">
                                        <span className="input-group-text"> <IconLock /></span>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Password"
                                            onChange={(event) => setPassword(event.target.value)}
                                            style={{
                                                borderLeft: '0',
                                                borderTop: '0',
                                                borderRight: '0'
                                            }}
                                        />
                                        <label style={{
                                            marginLeft: "4rem"
                                        }}>Password</label>
                                        <small id="passworderror" className="text-danger form-text">
                                            {passwordError}
                                        </small>
                                    </div>
                                    <div className="form-group" style={{ padding: '1rem' }}>
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="exampleCheck1"
                                        />
                                        <label className="form-check-label">&nbsp; Check me out</label>
                                    </div>
                                    <div className="d-grid">
                                        <button className="btn btn-login text-uppercase fw-bold" type="submit" style={{
                                            backgroundColor: '#0b2151',
                                            color: "white"
                                        }
                                        }>Sign
                                            in</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
            </Modal> */}
        </>
    );
}

export default withKeycloak(LoginStub);