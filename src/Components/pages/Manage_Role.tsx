import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ComponentFooter from "./Component_Footer";
import ComponentHeader from "./Component_Header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { ToastContainer, toast } from "react-toastify";
import {
  adminViewRoleFun,
  adminRolePermissionFun,
  adminRolePost,
  adminRoleDelete,
  adminRoleGet,
  adminRoleUpdate,
} from "../../redux/action/adminAction";
import { ManageRole } from "./InterfaceTypes";
import { Permissions } from "../../constants/PermissionConstant";
function Manage_Role() {
  const dispatch = useDispatch<AppDispatch>();
  const { adminViewRole } = useSelector((state: any) => state?.adminViewRole);
  const { adminRoleGetData } = useSelector(
    (state: any) => state?.adminRoleGetData
  );
  // role edit state
  const { adminFeatures } = useSelector((state: any) => state?.adminFeatures);
  const { adminRolePermission } = useSelector(
    (state: any) => state?.adminRolePermission
  );
  const [roleId, setRoleId] = useState();
  const [permissionData, setPermissionData] = useState<Array<string>>([]);
  const [permissionDataId] = useState<Array<string>>([]);
  const [data, setData] = useState<any>([]);
  const [search, setSearch] = useState<string>("");
  const totalEntry = adminViewRole?.payload?.length;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [permissions, setPermissions] = useState<any>([]);

  useEffect(() => {
    document.body.className = "app d-flex flex-column h-100";
    dispatch(adminViewRoleFun());
    adminROlePermission();
  }, []);

  // update checkbox start
  const adminROlePermission = async () => {
    const tempermissionData: any = await dispatch(adminRolePermissionFun());
    setPermissionData(tempermissionData?.payload);
  };

  useEffect(() => {
    const customObject = [] as number[];
    adminRoleGetData?.payload?.permissions?.map((ele: any) => {
      customObject.push(ele?.id);
    });
    setPermissions(customObject);
  }, [adminRoleGetData]);

  useEffect(() => {
    // update data to send
    const updateData = { ...data };
    updateData["permissions"] = [];
    adminFeatures?.payload?.map((ele: any) => {
      const array = permissions[ele.id];
      if (array?.length > 0) {
        array?.map((innerEle: any) => {
          updateData["permission"].push(innerEle);
        });
      }
    });
    setData(updateData);
  }, [permissions]);

  const handelPermission = (e: any) => {
    let dataPermission = permissions;

    if (e.target.checked) {
      permissionData.map((item: any) => {
        if (!permissions.includes(item?.id)) {
          dataPermission.push(parseInt(item?.id));
        }
      });
    } else {
      dataPermission.splice(0, permissionData.length);
    }
    setData({ ...data, permission: dataPermission });
  };

  const handelPermissionUpdate = (e: any) => {
    let dataPermission = permissions;
    if (e.target.checked) {
      dataPermission.push(parseInt(e?.target?.value));
    } else {
      var indexPermission = dataPermission.indexOf(parseInt(e?.target?.value));
      dataPermission.splice(indexPermission, 1);
    }
    setData({ ...data, permission: dataPermission });
  };

  // search data
  const searchFilterData = adminViewRole?.payload?.filter((item: any) => {
    if (search === "") {
      return item;
    } else if (item?.title?.toLowerCase().includes(search.toLowerCase())) {
      return item;
    }
  });
  //search end

  //pagination start
  const handleClick = (event: any) => {
    setCurrentPage(Number(event?.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math?.ceil(totalEntry / itemsPerPage); i++) {
    pages.push(i);
  }
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const searchData = searchFilterData?.slice(indexOfFirstItem, indexOfLastItem);
  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  const handleNext = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = (
      <li className="page-item" onClick={handlePrevious}>
        {" "}
        <Link className="page-link" to="#">
          {" "}
          &hellip;{" "}
        </Link>
      </li>
    );
  }

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <li className="page-item" onClick={handleNext}>
        {" "}
        <Link className="page-link" to="#">
          {" "}
          &hellip;{" "}
        </Link>
      </li>
    );
  }

  const renderPageNumbers = pages.map((number: any) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          className={currentPage === number ? "page-item active" : "page-item"}
          onClick={handleClick}
        >
          <Link className="page-link" key={number} id={number} to="#">
            {number}
          </Link>
        </li>
      );
    } else {
      return null;
    }
  });
  //pagination end

  // deleteRole
  const deleteRole = async (e: any, type: any) => {
    const datainfo: any = await dispatch(adminRoleDelete(e));

    if (datainfo?.response?.data?.status === false && type === "delete") {
      toast.error(datainfo?.response?.data?.message);
      setTimeout(() => {
        toast.dismiss();
      }, 1000);
    } else {
      setTimeout(() => {
        dispatch(adminViewRoleFun());
      }, 500);
      dispatch(adminViewRoleFun());
    }
  };

  // getRole data

  const getRoleData = (role: any) => {
    let dataPermission: any = [];
    role?.payload?.permissions.map((per: any) => {
      dataPermission.push(parseInt(per?.id));
    });

    setPermissions(dataPermission);
    setData({
      ...data,
      permission: dataPermission,
      title: role?.payload?.title,
      isActive: role?.payload?.isActive,
      description: role?.payload?.description,
    });
  };

  // edit role
  const editRole = async (e: any) => {
    setRoleId(e);
    dispatch(adminRoleGet(e));
    var roleData = await dispatch(adminRoleGet(e));
    return getRoleData(roleData);
  };

  //handleActive
  const HandleActive = (e: any) => {
    if (e.target.checked) {
      setData({ ...data, isActive: true });
    } else {
      setData({ ...data, isActive: false });
    }
  };

  // updateHandleActive
  const updateHandleActive = (e: any) => {
    if (e.target.checked) {
      setData({ ...data, isActive: true });
    } else {
      setData({ ...data, isActive: false });
    }
  };

  // Post data - create new role
  const handlelManageRole = async (e: any) => {
    e.preventDefault();
    let senddata = JSON.stringify(data);
    const roleStatus: any = await dispatch(adminRolePost(senddata));
    if (roleStatus?.response?.data?.status === false) {
      toast.error("Role Already Exist!");
    } else {
      e.target.reset();
      var btn = document.getElementById("idButtonPost");
      btn?.click();
      setTimeout(() => {
        dispatch(adminViewRoleFun());
      }, 1000);
      dispatch(adminViewRoleFun());

      toast.success("Role Created Successfully!");
      permissions.splice(0, permissions.length);
    }
  };

  // update Role
  const handlelManageRoleEdit = async (e: any) => {
    e.preventDefault();
    let senddata = JSON.stringify(data);

    const roleUpdateData: any = await dispatch(
      adminRoleUpdate(roleId, senddata)
    );

    if (roleUpdateData?.response?.data?.status === false) {
      toast.error("Role Already Exist!");
    } else {
      var btn = document.getElementById("idButtonUpdate");
      btn?.click();
      setTimeout(() => {
        e.target.reset();
        dispatch(adminViewRoleFun());
      }, 500);
      dispatch(adminViewRoleFun());

      toast.success("Role Update Successfully!");
      permissions.splice(0, permissions.length);
    }
  };

  const handelReset = () => {
    toast.dismiss();
  };

  return (
    <Fragment>
      <ToastContainer />
      <div className="app d-flex flex-column h-100">
        <ComponentHeader />

        {/* <!-- Main container --> */}
        <main className="flex-shrink-0">
          <section className="section_wrapper_sm">
            <div className="container container-fluid">
              <div className="tile_wrapper">
                <div className="tilewp_header">
                  <div className="tilewp-left">
                    <h3 className="tilewp-title">Manage Role</h3>
                  </div>
                  <div className="tilewp-right">
                    <div className="has-search search-group mr-3">
                      <span className="las la-search form-control-feedback"></span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        onChange={(e: any) => setSearch(e.target.value)}
                      />
                    </div>
                    <div className="btn-group">
                      <button
                        onClick={handelReset}
                        className="btn btn-primary "
                        data-toggle="modal"
                        data-target="#myModal2"
                      >
                        {" "}
                        Add Role
                      </button>
                    </div>
                  </div>
                </div>
                <div className="tilewp-body">
                  <div className="table-responsive table_custom">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Role</th>
                          <th>Users</th>
                          <th>Permissions</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchData?.map((data: ManageRole) => {
                          return (
                            <Fragment>
                              <tr>
                                <td>{data?.title}</td>
                                <td>{data?.total_users}</td>
                                <td>{data?.permissions?.length}</td>
                                <td>
                                  {data?.isActive === true ? (
                                    <div className="toggle">
                                      <label className="mb-0">
                                        <input
                                          readOnly
                                          type="checkbox"
                                          checked={true}
                                        />
                                        <span className="button-indecator"></span>
                                      </label>
                                    </div>
                                  ) : (
                                    <div className="toggle">
                                      <label className="mb-0">
                                        <input
                                          readOnly
                                          type="checkbox"
                                          checked={false}
                                        />
                                        <span className="button-indecator"></span>
                                      </label>
                                    </div>
                                  )}
                                </td>
                                <td>
                                  {data?.title !== Permissions.Admin &&
                                  data?.title !== Permissions.General &&
                                  data?.title !== Permissions.Approval &&
                                  data?.title !== Permissions.Reviewer &&
                                  data?.title !== Permissions.UserRole ? (
                                    <button
                                      style={{
                                        border: "none",
                                        background: "none",
                                      }}
                                      data-toggle="modal"
                                      data-target="#myModal3"
                                      className="editicon"
                                      onClick={(e) => editRole(data?.id)}
                                    >
                                      <i className="las la-pen"></i>
                                    </button>
                                  ) : (
                                    <button
                                      style={{
                                        border: "none",
                                        background: "none",
                                        cursor: "not-allowed",
                                      }}
                                      data-toggle="modal"
                                      data-target="#myModal3"
                                      className="editicon"
                                      disabled
                                    >
                                      <i className="las la-pen"></i>
                                    </button>
                                  )}

                                  <button
                                    style={{
                                      border: "none",
                                      background: "none",
                                    }}
                                    data-toggle="modal"
                                    data-target="#myModal4"
                                    className="editicon"
                                    onClick={(e) => editRole(data?.id)}
                                  >
                                    <i className="las la-eye"></i>
                                  </button>

                                  {data?.title !== Permissions.Admin &&
                                  data?.title !== Permissions.General &&
                                  data?.title !== Permissions.Approval &&
                                  data?.title !== Permissions.Reviewer &&
                                  data?.title !== Permissions.UserRole ? (
                                    <button
                                      style={{
                                        border: "none",
                                        background: "none",
                                      }}
                                      onClick={(e) =>
                                        deleteRole(data?.id, "delete")
                                      }
                                      className="deleteicon"
                                    >
                                      {" "}
                                      <i className="las la-trash"></i>
                                    </button>
                                  ) : (
                                    <button
                                      style={{
                                        border: "none",
                                        background: "none",
                                        cursor: "not-allowed",
                                      }}
                                      className="deleteicon"
                                      disabled
                                    >
                                      <i className="las la-trash"></i>
                                    </button>
                                  )}
                                </td>
                              </tr>
                            </Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {/* <ToastContainer  /> */}
                </div>

                <div className="tilewp-footer ">
                  <div className="tile-footer-lt">
                    <p>
                      Showing {indexOfFirstItem + 1} to{" "}
                      {indexOfLastItem > totalEntry
                        ? totalEntry
                        : indexOfLastItem}{" "}
                      of {totalEntry} entries
                    </p>
                  </div>
                  <div className="tile-footer-rt">
                    <div className="">
                      <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end">
                          <li
                            className="page-item"
                            onClick={
                              currentPage == pages[0]
                                ? () => null
                                : handlePrevious
                            }
                          >
                            <Link
                              className={
                                currentPage == pages[0]
                                  ? "page-link disableCursor"
                                  : "page-link"
                              }
                              to="#"
                            >
                              Previous
                            </Link>
                          </li>
                          {pageDecrementBtn}
                          {renderPageNumbers}
                          {pageIncrementBtn}
                          <li
                            className="page-item"
                            onClick={
                              currentPage == pages[pages.length - 1]
                                ? () => null
                                : handleNext
                            }
                          >
                            <Link
                              className={
                                currentPage == pages[pages.length - 1]
                                  ? "page-link disableCursor"
                                  : "page-link"
                              }
                              to="#"
                            >
                              Next
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        {/* <!-- Footer --> */}
        <ComponentFooter />

        {/* model */}
        <div
          className="modal right modal_custom fade"
          id="myModal2"
          tabIndex={1}
          role="dialog"
          data-backdrop="static"
          data-keyboard="false"
          aria-labelledby="myModalLabel2"
        >
          <div className="modal-dialog" role="document">
            <form onSubmit={handlelManageRole}>
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Add Role</h4>
                  <button
                    type="button"
                    id="idButtonPost"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <i className="ra ra-close"></i>
                  </button>
                </div>

                <div className="modal-body">
                  <div className="form-group">
                    <label className="control-label">
                      Role <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      required
                      placeholder="Enter here"
                      onChange={(e: any) =>
                        setData({
                          ...data,
                          title: e.target.value,
                          isActive: true,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">
                      Description <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      rows={4}
                      required
                      placeholder="Enter your Description"
                      onChange={(e: any) =>
                        setData({
                          ...data,
                          description: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>

                  <div className="form-group row">
                    <label className="control-label col-md-2">Active</label>
                    <div className="toggle col-md-10">
                      <label>
                        <input
                          type="checkbox"
                          onChange={HandleActive}
                          defaultChecked={true}
                        />
                        <span className="button-indecator"></span>
                      </label>
                    </div>
                  </div>
                  <div className="from-group">
                    <div className="table-responsive table_custom">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Permissions</th>
                            <th></th>
                            <th>
                              All{" "}
                              <div className="animated-checkbox">
                                <label className="mb-0">
                                  <input
                                    name="All"
                                    onChange={handelPermission}
                                    checked={
                                      permissions.length ===
                                      permissionData.length
                                    }
                                    type="checkbox"
                                  />
                                  <span className="label-text"></span>
                                </label>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {permissionData?.map((permissionName: any) => {
                            return (
                              <Fragment>
                                <tr>
                                  {" "}
                                  <td>{permissionName?.title}</td>
                                  <td key={permissionName?.id}>
                                    <div className="animated-checkbox">
                                      <label className="mb-0">
                                        <input
                                          value={permissionName?.id}
                                          onChange={handelPermissionUpdate}
                                          type="checkbox"
                                          checked={permissions.includes(
                                            permissionName?.id
                                          )}
                                        />
                                        <span className="label-text"></span>
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                              </Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="form-group-btn d-flex align-items-center justify-content-center ">
                    <button type="submit" className="btn reset btn-primary ">
                      Save
                    </button>
                    <button
                      data-dismiss="modal"
                      className="btn apply btn-outline-primary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* <!-- Edit Role Modal --> */}
        <div
          className="modal right modal_custom fade"
          id="myModal3"
          tabIndex={1}
          role="dialog"
          data-backdrop="static"
          data-keyboard="false"
          aria-labelledby="myModalLabel3"
        >
          <div className="modal-dialog" role="document">
            <form onSubmit={handlelManageRoleEdit}>
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Edit Role</h4>
                  <button
                    type="button"
                    id="idButtonUpdate"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <i className="ra ra-close"></i>
                  </button>
                </div>

                <div className="modal-body">
                  <div className="form-group">
                    <label className="control-label">
                      Role <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      required
                      defaultValue={adminRoleGetData?.payload?.title}
                      placeholder="Enter here"
                      onChange={(e: any) =>
                        setData({ ...data, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">
                      Description <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      rows={4}
                      required
                      defaultValue={adminRoleGetData?.payload?.description}
                      placeholder="Enter your address"
                      onChange={(e: any) =>
                        setData({ ...data, description: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <div className="form-group row">
                    <label className="control-label col-md-2">Active</label>
                    <div className="toggle col-md-10">
                      <label>
                        <input
                          type="checkbox"
                          onClick={updateHandleActive}
                          defaultChecked={adminRoleGetData?.payload?.isActive}
                        />
                        <span className="button-indecator"></span>
                      </label>
                    </div>
                  </div>{" "}
                  <div className="from-group">
                    <div className="table-responsive table_custom">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Permissions</th>
                            <th></th>
                            <th>
                              All{" "}
                              <div className="animated-checkbox">
                                <label className="mb-0">
                                  <input
                                    name="All"
                                    onChange={handelPermission}
                                    checked={
                                      permissions.length ===
                                      permissionData.length
                                    }
                                    type="checkbox"
                                  />
                                  <span className="label-text"></span>
                                </label>
                              </div>
                            </th>{" "}
                            *
                          </tr>
                        </thead>
                        <tbody>
                          {permissionData?.map((permissionName: any) => {
                            return (
                              <Fragment>
                                <tr>
                                  {" "}
                                  <td>{permissionName?.title}</td>
                                  <td key={permissionName?.id}>
                                    <div className="animated-checkbox">
                                      <label className="mb-0">
                                        <input
                                          defaultValue={permissionName?.id}
                                          onChange={handelPermissionUpdate}
                                          type="checkbox"
                                          checked={permissions.includes(
                                            permissionName?.id
                                          )}
                                        />
                                        <span className="label-text"></span>
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                              </Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="form-group-btn d-flex align-items-center justify-content-center ">
                    <button type="submit" className="btn reset btn-primary ">
                      Save
                    </button>
                    <button
                      data-dismiss="modal"
                      className="btn apply btn-outline-primary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* View Role Modal */}
        <div
          className="modal right modal_custom fade"
          id="myModal4"
          tabIndex={1}
          role="dialog"
          data-backdrop="static"
          data-keyboard="false"
          aria-labelledby="myModalLabel3"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">View Role</h4>
                <button
                  type="button"
                  id="idButtonUpdate"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ra ra-close"></i>
                </button>
              </div>

              <div className="modal-body">
                <div className="form-group">
                  <label className="control-label">
                    Role <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    readOnly
                    defaultValue={adminRoleGetData?.payload?.title}
                    placeholder="Enter here"
                  />
                </div>
                <div className="form-group">
                  <label className="control-label">
                    Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    readOnly
                    className="form-control"
                    rows={4}
                    required
                    defaultValue={adminRoleGetData?.payload?.description}
                    placeholder="Enter your address"
                  ></textarea>
                </div>
                <div className="form-group row">
                  <label className="control-label col-md-2">Active</label>
                  <div className="toggle col-md-10">
                    <label>
                      <input
                        readOnly
                        type="checkbox"
                        checked={adminRoleGetData?.payload?.isActive}
                      />

                      <span className="button-indecator"></span>
                    </label>
                  </div>
                </div>{" "}
                <div className="from-group">
                  <div className="table-responsive table_custom">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Permissions</th>
                          <th></th>
                          <th>
                            All{" "}
                            <div className="animated-checkbox">
                              <label className="mb-0">
                                <input
                                  name="All"
                                  readOnly
                                  checked={
                                    permissions.length === permissionData.length
                                  }
                                  type="checkbox"
                                />
                                <span className="label-text"></span>
                              </label>
                            </div>
                          </th>{" "}
                        </tr>
                      </thead>
                      <tbody>
                        {permissionData?.map((permissionName: any) => {
                          return (
                            <Fragment>
                              <tr>
                                <td>{permissionName?.title}</td>
                                <td key={permissionName?.id}>
                                  <div className="animated-checkbox">
                                    <label className="mb-0">
                                      <input
                                        defaultValue={permissionName?.id}
                                        readOnly
                                        type="checkbox"
                                        checked={permissions.includes(
                                          permissionName?.id
                                        )}
                                      />
                                      <span className="label-text"></span>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                            </Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="form-group-btn d-flex align-items-center justify-content-center ">
                  <button
                    data-dismiss="modal"
                    className="btn apply btn-outline-primary"
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Manage_Role;
