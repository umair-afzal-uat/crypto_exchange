import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../../components/AppLayout";
import useDebounce from "../../hooks/useDebounce";
import {
  addPersonToGroup,
  changeDownPayment,
  changeFee,
  getFee,
  getGroupPercent,
  getMainPercent,
  removePersonFromGroup,
  searchPersons,
  setGroupPercent,
  setMainPercent,
} from "../../redux/fee/action";

const FeeManagement = () => {
  
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.fee);
  const [state, setState] = useState({});
  const [downPayment, setDownPayment] = useState("0");
  const [value, setValue] = useState("");
  const debouncePerson = useDebounce(value, 200);
  const [isSearchPerson, setSearchPerson] = useState(false);
  const [listPersons, setListPersons] = useState([]);
  const [selectedPersons, setSelectedPersons] = useState([]);
  const [allPercent, setAllPercent] = useState("");
  const [groupPercentValue, setGroupPercentValue] = useState("");

  useEffect(() => {
    dispatch(getFee(setDownPayment));
    dispatch(getGroupPercent(setGroupPercentValue, setSelectedPersons));
    dispatch(getMainPercent(setAllPercent));
  }, [dispatch]);
  //Set List Fee
  useEffect(() => {
    if (!data) return;
    const obj = {};
    data?.first?.forEach((element) => {
      obj[element.id] = element.fee;
    });
    data?.second?.forEach((element) => {
      obj[element.id] = element.fee;
    });

    setState(obj);
  }, [data]);
  //Search
  useEffect(() => {
    if (debouncePerson?.trim()?.length >= 2 && isSearchPerson) {
      dispatch(searchPersons({ search: debouncePerson }, setListPersons));
    } else if (listPersons) setListPersons([]);
  }, [dispatch, debouncePerson]);
  //Fee
  const changeState = (e, id) => {
    setState({ ...state, [id]: e.target.value });
  };
  const sendNewFee = (id) => {
    dispatch(changeFee(id, { fee: state[id] }));
  };
  //DownPayment
  const handleSetDownPayment = ({ target: { value } }) => {
    setDownPayment(value);
  };
  const sendDownPayment = () => {
    dispatch(changeDownPayment({ down_payment: downPayment }));
  };
  //Search
  const handleSetValue = ({ target: { value } }) => {
    if (!isSearchPerson) setSearchPerson(true);
    setValue(value);
  };

  const setSelectedPersonsFunck = (person) => {
    setSelectedPersons([...selectedPersons, person]);
  };
  const handleSetSelectedPersons = (person) => {
    const body = {
      user_id: person?.searchable?.id,
      group_id: 1,
    };
    dispatch(
      addPersonToGroup(
        body,
        setSelectedPersonsFunck,
        setSearchPerson,
        setListPersons
      )
    );
  };

  const deleteSelectedPerson = (person) => {
    const body = {
      user_id: person?.id,
      group_id: null,
    };
    dispatch(removePersonFromGroup(body, setSelectedPersons));
  };
  //All users percent
  const saveAllPercent = () => {
    dispatch(setMainPercent({ rate: allPercent }));
  };
  const handleSetAllPercent = ({ target: { value } }) => {
    setAllPercent(value);
  };

  //Group  percent
  const saveGroupPercent = () => {
    dispatch(
      setGroupPercent({
        group_id: 1,
        rate: groupPercentValue,
      })
    );
  };

  const handleSetGroupPercent = ({ target: { value } }) => {
    setGroupPercentValue(value);
  };

  return (
    <AppLayout>
      <div className="content-header">
        <div className="title-block">
          <p className="title">Affiliate program percent</p>
        </div>
        {/* <button className="button">Save</button> */}
      </div>
      <div className="section-block">
        <div className="input-row">
          <span className="input-title">All users</span>
          <div className="input-wrapper input-wrapper--value">
            <input
              className="input-item input-item--small"
              type="number"
              value={allPercent}
              onChange={handleSetAllPercent}
            />
          </div>
          <button className="button" onClick={saveAllPercent}>
            Save
          </button>
        </div>
      {/*  <div className="content-row content-row--small">
          <div className="input-row input-row--margin-none input-row--column input-row--start">
            <div className="input input--flex">
              <div className="input-wrapper input-wrapper--flex">
                <input
                  className="input-item input-item--right-icon"
                  type="text"
                  placeholder="Search..."
                  onChange={handleSetValue}
                />
                <button className="input-icon input-icon--right input-icon--small">
                  <svg
                    width="19"
                    height="20"
                    viewBox="0 0 19 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.10416 17.125C13.2578 17.125 16.625 13.7578 16.625 9.60421C16.625 5.45057 13.2578 2.08337 9.10416 2.08337C4.95052 2.08337 1.58333 5.45057 1.58333 9.60421C1.58333 13.7578 4.95052 17.125 9.10416 17.125Z"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M17.4167 17.9167L15.8333 16.3334"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="input-data">
                {selectedPersons?.map((elem) => (
                  <div className="data-user">
                    {" "}
                    <span className="data-user__name">
                      {" "}
                      {elem?.first_name} {elem?.last_name}
                    </span>
                    <button
                      className="data-user__close"
                      onClick={() => deleteSelectedPerson(elem)}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 10L10 2"
                          stroke="#292D32"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M10 10L2 2"
                          stroke="#292D32"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              {!!listPersons?.length && (
                <div className="data-dropdown">
                  {listPersons?.map((elem) => (
                    <button
                      className="data-user data-dropdown__item"
                      onClick={() => handleSetSelectedPersons(elem)}
                    >
                      <span className="data-user__name">
                        {elem?.searchable?.first_name}{" "}
                        {elem?.searchable?.last_name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="input-wrapper input-wrapper--value">
              <input
                className="input-item input-item--small"
                type="number"
                value={groupPercentValue}
                onChange={handleSetGroupPercent}
              />
            </div>
            <button className="button" onClick={saveGroupPercent}>
              Save
            </button>
          </div>
        </div>*/}
      </div>
      <div className="section-block">
        <p className="title title--padding-bottom">Down payment</p>
        <div className="input-row input-row--margin-none input-row--column ">
          <div className="input-wrapper input-wrapper--value">
            <input
              className="input-item input-item--small"
              type="number"
              value={downPayment}
              onChange={handleSetDownPayment}
            />
          </div>
          <button className="button" onClick={sendDownPayment}>
            Save
          </button>
        </div>
      </div>

      <div className="section-block">
        <p className="title">Weekly payments percent</p>
        <div className="content-row content-row--small">
          <div className="fee-block">
            <div className="table-block">
              <div className="table-wrapper">
                <div className="table table--fee">
                  <div className="table-header">
                    <div className="tr">
                      <div className="td">
                        <div className="td-name">
                          <p>Week</p>
                        </div>
                      </div>
                      <div className="td">
                        <div className="td-name">
                          <p>Finance Fee</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-body">
                    {data?.first?.map((elem,index) => (
                      <div className="tr" key={index}>
                        <div className="td">
                          <p className="td-hidden-name">Week</p>
                          <p>{elem.period}</p>
                        </div>
                        <div className="td td--flex">
                          <p className="td-hidden-name">Finance Fee</p>
                          <div className="input-wrapper input-wrapper--value">
                            <input
                              className="input-item"
                              type="number"
                              value={state[elem.id]}
                              onChange={(e) => changeState(e, elem.id)}
                            />
                          </div>
                          <button
                            className="link link--green link--left"
                            onClick={() => sendNewFee(elem.id)}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fee-block">
            <div className="table-block">
              <div className="table-wrapper">
                <div className="table table--fee">
                  <div className="table-header">
                    <div className="tr">
                      <div className="td">
                        <div className="td-name">
                          <p>Week</p>
                        </div>
                      </div>
                      <div className="td">
                        <div className="td-name">
                          <p>Finance Fee</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-body">
                    {data?.second?.map((elem) => (
                      <div className="tr">
                        <div className="td">
                          <p className="td-hidden-name">Week</p>
                          <p>{elem.period}</p>
                        </div>
                        <div className="td td--flex">
                          <p className="td-hidden-name">Finance Fee</p>
                          <div className="input-wrapper input-wrapper--value">
                            <input
                              className="input-item"
                              type="number"
                              value={state[elem.id]}
                              onChange={(e) => changeState(e, elem.id)}
                            />
                          </div>
                          <button
                            className="link link--green link--left"
                            onClick={() => sendNewFee(elem.id)}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default FeeManagement;
