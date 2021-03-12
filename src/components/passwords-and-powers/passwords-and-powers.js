import React, { useState, useEffect } from "react";
import {
  getOperators,
  createOperator,
  deleteOperator,
} from "../../redux/actions/operatorAction";
// import CreateOperator from "../create-operator-modal/create-operator";
import LoadingSpinner from "../loading-spinner/loading-spinner";
import { useSelector, useDispatch } from "react-redux";
import "./styles.css";
import Modal from "../modal/modal";
import Modal3 from "../modal/modal-3";
export default function PasswordsAndPowers(props) {
  const dispatch = useDispatch();
  const { loading, operators } = useSelector((state) => state.operators);
  // const [show, setShow] = useState(false);
  const [show3, setShow3] = useState(false);
  // const [showCreate, setShowCreate] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState({});
  const [deleteShow, setDeleteShow] = useState(false);
  const [userName, setUserName] = useState({
    label: "Username",
    error: "",
    valueName: "name",
    value: "",
    type: "text",
    handleChange: (val) => {
      setUserName((fld) => ({ ...fld, value: val.trim().toLowerCase() }));
    },

    handleBlur: (val) => {
      setUserName((fld) => ({
        ...fld,
        error:
          val.indexOf(" ") !== -1 ? "There must be no space in username" : "",
      }));
    },
  });
  const [password, setPassword] = useState({
    label: "Password",
    error: "",
    valueName: "password",
    value: "",
    type: "password",
    handleChange: (val) => {
      setPassword((fld) => ({ ...fld, value: val.trim().replace(" ", "") }));
    },

    handleBlur: (val) => {
      let error = "";
      if (val.length < 8) error = "Password must be atleast 8 characters long";
      setPassword((fld) => ({
        ...fld,
        error: error,
      }));
    },
  });
  const [confirmPassword, setConfirmPassword] = useState({
    label: "Re-enter password",
    error: "",
    valueName: "rePassword",
    value: "",
    type: "password",
    handleChange: (val) => {
      setConfirmPassword((fld) => ({
        ...fld,
        value: val.trim().replace(" ", ""),
      }));
    },

    handleBlur: (val) => {
      // let error = "";
      // if (val.toString() !== password.value.toString())
      //   error = "Password did not match";
      // setConfirmPassword((fld) => ({
      //   ...fld,
      //   error: error,
      // }));
    },
  });
  const [email, setEmail] = useState({
    label: "Email",
    error: "",
    valueName: "email",
    value: "",
    type: "email",
    handleChange: (val) => {
      setEmail((fld) => ({ ...fld, value: val }));
    },

    handleBlur: (val) => {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      setEmail((fld) => ({
        ...fld,
        error: re.test(val) ? "" : "Invalid email id",
      }));
    },
  });
  useEffect(() => {
    setConfirmPassword((fld) => ({
      ...fld,
      error:
        confirmPassword.value && password.value !== confirmPassword.value
          ? "Password did not match"
          : "",
    }));
  }, [password.value, confirmPassword.value]);
  const closeModal = () => {
    setShow3(false);
  };
  useEffect(() => {
    dispatch(getOperators());
  }, [dispatch]);
  const handleChange = (values) => {
    dispatch(
      createOperator({ name: values[0], email: values[3], password: values[1] })
    );
  };
  const handleSubmit = () => {
    if (
      !userName.error &&
      !password.error &&
      !confirmPassword.error &&
      !email.error
    ) {
      dispatch(
        createOperator({
          name: userName.value.toLowerCase(),
          email: email.value,
          password: password.value,
        })
      );
      setShow3(false);
      // return console.log("lets go");
    }
  };
  const handleDeleteClick = (operator) => {
    setDeleteShow(true);
    setSelectedOperator(operator);
  };
  return (
    <>
      {show3 && (
        <Modal3
          closeModal={closeModal}
          handleSubmit={handleSubmit}
          fields={[userName, password, confirmPassword, email]}
        />
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="password-authority-container">
          <p
            onClick={() => {
              setUserName((fld) => ({ ...fld, value: "" }));
              setPassword((fld) => ({ ...fld, value: "" }));
              setConfirmPassword((fld) => ({ ...fld, value: "" }));
              setEmail((fld) => ({ ...fld, value: "" }));
              setShow3(true);
            }}
          >
            Create Operators
          </p>
        </div>
      )}
      {deleteShow && selectedOperator.name && (
        <div className="delete-operator-modal">
          <div className="delete-operator-modal__box">
            <p className="delete-operator-modal__text">
              Are you sure You want to delete {selectedOperator.name}?
            </p>
            <div className="delete-operator-modal__buttons">
              <button
                onClick={() => {
                  setDeleteShow(false);
                  dispatch(deleteOperator({ email: selectedOperator.email }));
                }}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setDeleteShow(false);
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="credentials-table">
        <div className="credentials-table__heading-row row mx-0 px-0">
          <h3 className="col-5">Name</h3>
          <h3 className="col-5">Email</h3>
        </div>
        {operators.length > 0 &&
          operators.map((operator) => (
            <div className="credentials-row row mx-0 px-0">
              <div className="supervisor-col col-5">
                <span>{operator.name}</span>
              </div>
              <div className="email-col col-5">
                <span>{operator.email}</span>
              </div>

              <div className="credentials-row__delete-button-container">
                <span
                  onClick={() => handleDeleteClick(operator)}
                  className="fa fa-trash fa-lg"
                ></span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
