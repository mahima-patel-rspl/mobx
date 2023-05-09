import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ComponentFooter from "./Component_Footer";
import ComponentHeader from "./Component_Header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import AsyncSelect from "react-select/async";
import { ToastContainer, toast } from "react-toastify";
import Multiselect from "multiselect-react-dropdown";
import {
  adminViewRoleFun,
  adminManageUserGet,
  adminRolePermissionFun,
  adminManageUserDelete,
  adminRoleGet,
  adminManageUserPost,
  adminManageUserGetOne,
  adminManageUserUpdate,
} from "../../redux/action/adminAction";
import {
  CategoryListFun,
  SubCategoryListFun,
  fetchUserPost,
} from "../../redux/action/userAction";
import { ManageUser } from "./InterfaceTypes";
function Assign_Permissions() {
  const dispatch = useDispatch<AppDispatch>();
  const { adminManageUserOneData } = useSelector(
    (state: any) => state?.adminManageUserGetOne
  );
  const { adminViewRole } = useSelector((state: any) => state?.adminViewRole);
  const { adminManageUserGetData } = useSelector(
    (state: any) => state.adminManageUserGet
  );
  const { fetchUserPostData } = useSelector(
    (state: any) => state?.fetchUserPost
  );
  const [userId, setUserId] = useState();
  const [permissionData, setPermissionData] = useState([]);
  const [categoryListData, setCategoryListData] = useState<any>([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryListData, setSubCategoryListData] = useState<any>([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [data, setData] = useState<any>([]);
  const [userData, setUserData] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [nameError, setNameError] = useState(false);
  const [subCatError, setSubCatError] = useState(false);
  const totalEntry = adminManageUserGetData?.payload?.length;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [permissions, setPermissions] = useState<any>([]);
  useEffect(() => {
    document.body.className = "app d-flex flex-column h-100";
    dispatch(adminViewRoleFun());
    dispatch(adminManageUserGet());
    dispatch(adminViewRoleFun());
    rolePermission();
  }, []);

  useEffect(() => {
    Cateogry();
  }, [categoryList]);

  useEffect(() => {
    SubCateogry();
  }, [subCategoryList]);

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

  const Cateogry = async () => {
    const customObject = [] as number[];
    categoryList?.map((ele: any) => {
      customObject.push(ele?.id);
    });

    const CateogryData = { id: customObject };

    var subCategoryData = await dispatch(SubCategoryListFun(CateogryData));

    setSubCategoryListData(subCategoryData);
  };

  const SubCateogry = async () => {
    const customObject = [] as number[];
    subCategoryList?.map((ele: any) => {
      customObject.push(ele?.id);
    });
    setSubCatError(false);
    setData({ ...data, subcategory: customObject });
  };

  const rolePermission = async () => {
    const tempermissionData: any = await dispatch(adminRolePermissionFun());

    const CategoryList = await dispatch(CategoryListFun());
    setCategoryListData(CategoryList);
    setPermissionData(tempermissionData?.payload);
  };

  // activeRole Filter data
  const roleFilter = adminViewRole?.payload?.filter((role: any) => {
    if (role?.isActive) {
      return role;
    }
  });

  // handel checkbox
  const filterName = (inputValue: string) => {
    return fetchUserPostData?.payload?.filter((info: any) =>
      info?.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  interface IfetchData {
    readonly value: string;
    readonly label: string;
    readonly designation: string;
  }
  const fetchData = (users: any) => {
    return users?.payload?.map((user: any) => {
      return {
        value: user?.email,
        label: user?.name,
        designation: user?.designation,
      };
    });
  };

  // setName and Email Id
  const onChangeSelectedOption = (e: any) => {
    setData({
      ...data,
      email: e.value,
    });
    setUserData({
      ...userData,
      name: e.label,
      email: e.value,
      designation: e.designation,
    });

    setNameError(false);
  };

  const loadOptions = async (
    inputValue: any,
    callback: (options: IfetchData[]) => void
  ) => {
    if (inputValue.length > 2) {
      const data = { search: inputValue };
      var fetchDataValue: any = await dispatch(fetchUserPost(data));

      filterName(inputValue);
    }

    return fetchData(fetchDataValue);
  };

  // search data
  const searchFilterData = adminManageUserGetData?.payload?.filter(
    (item: any) => {
      if (search === "") {
        return item;
      } else if (
        item?.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
        item?.email.toLowerCase().includes(search.toLocaleLowerCase())
      ) {
        return item;
      }
    }
  );

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

  //Delete User
  const deleteUser = async (e: any, id: number | null | undefined) => {
    // e.preventDefault();
    // const favResponse: any = await dispatch(adminManageUserDelete(id));
    // if (favResponse?.status === 200) {
    //   toast.success("user deleted successfully");
    //   dispatch(adminManageUserGet());
    //   var btn = document.getElementById("modalClose");
    //   btn?.click();
    // }
  };

  // edit User
  const editUser = async (e: any) => {
    const oneUserGetData: any = await dispatch(adminManageUserGetOne(e));

    let categoryData: any = [];
    let subCategoryData: any = [];

    oneUserGetData?.payload?.assignedStack?.category?.map(
      async (category: any) => {
        categoryData.push(category);
      }
    );

    oneUserGetData?.payload?.assignedStack?.techstack?.map(
      async (subCategory: any) => {
        subCategoryData.push(subCategory);
      }
    );
    setCategoryList(categoryData);
    setSubCategoryList(subCategoryData);
    setUserId(e);
    return getRoleData(oneUserGetData);
  };

  const getRoleData = (role: any) => {
    let dataPermission: any = [];
    role?.payload?.permissions.map((per: any) => {
      dataPermission.push(parseInt(per?.id));
    });
    setPermissions(dataPermission);

    setData({
      ...data,
      isActive: role?.payload?.userData?.isActive,
      role_id: role?.payload?.userData?.role_id,
      subcategory: subCategoryList,
    });
  };

  // handle Role
  const handelRolePost = async (e: any) => {
    let dataPermission: number[] = [];
    const userData: any = await dispatch(adminRoleGet(e.target.value));
    userData?.payload?.permissions.map((per: any) => {
      dataPermission.push(parseInt(per?.id));
    });
    setPermissions(dataPermission);
    setData({ ...data, role_id: parseInt(e.target.value) });
  };

  // Update Data Add User
  const handlelManageUpdateUser = async (e: any) => {
    e.preventDefault();
    let senddata = JSON.stringify(data);

    const AssignPerData: any = await dispatch(
      adminManageUserUpdate(userId, senddata)
    );

    if (AssignPerData?.status) {
      toast.success("Permissions Update Successfully!");

      dispatch(adminManageUserGet());
      var btn = document.getElementById("idButtonUpdate");
      btn?.click();
      setTimeout(() => {
        e.target.reset();
        dispatch(adminManageUserGet());
      }, 500);
    }
    setCategoryList([]);
    setSubCategoryList([]);
  };

  // Post Data Add User
  const handlelManageUser = async (e: any) => {
    e.preventDefault();
    let senddata: any = JSON.stringify(data);
    if (data?.name === undefined) {
      setNameError(true);
    }
    if (data?.subcategory === undefined) {
      setSubCatError(true);
    } else {
      e.target.reset();
      const userStatus: any = await dispatch(adminManageUserPost(senddata));

      if (userStatus?.response.data?.status === false) {
        toast.error(userStatus?.response?.data?.message);
      } else {
        var btn = document.getElementById("idButtonPost");
        btn?.click();
        setTimeout(() => {
          dispatch(adminManageUserGet());
        }, 500);
        toast.success("Assign Permissions Created Successfully!");
      }
    }

    setUserData([]);
    setPermissions([]);
    setCategoryList([]);
    setSubCategoryList([]);
  };

  return (
    <Fragment>
      <ToastContainer />;
      <div className="app d-flex flex-column h-100">
        <ComponentHeader />

        {/* <!-- Main container --> */}
        <main className="flex-shrink-0">
          <section className="section_wrapper_sm">
            <div className="container container-fluid">
              <div className="tile_wrapper">
                <div className="tilewp_header">
                  <div className="tilewp-left">
                    <h3 className="tilewp-title">Assign Permissions </h3>
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
                      <Link
                        to="#"
                        className="btn btn-primary "
                        data-toggle="modal"
                        data-target="#myModal3"
                      >
                        {" "}
                        Assign
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="tilewp-body">
                  <div className="table-responsive table_custom">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email Address</th>
                          <th>Designation</th>
                          <th>No. Of Permission</th>
                          <th>Role</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchData?.map((user: ManageUser) => {
                          return (
                            <Fragment>
                              <tr>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>{user?.designation}</td>
                                <td>{user?.role?.permissions?.length}</td>
                                <td>{user?.role?.title}</td>
                                <td>
                                  {user?.isActive === true ? (
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
                                  <button
                                    style={{
                                      border: "none",
                                      background: "none",
                                    }}
                                    data-toggle="modal"
                                    data-target="#myModal4"
                                    className="editicon"
                                    onClick={(e) => editUser(user?.id)}
                                  >
                                    <i className="las la-pen"></i>
                                  </button>

                                  <button
                                    style={{
                                      border: "none",
                                      background: "none",
                                    }}
                                    data-toggle="modal"
                                    data-target="#myModal5"
                                    className="editicon"
                                    onClick={(e) => editUser(user?.id)}
                                  >
                                    <i className="las la-eye"></i>
                                  </button>

                                  {/* <button
                                    style={{
                                      border: "none",
                                      background: "none",
                                    }}
                                    className="deleteicon"
                                    onClick={(e) => deleteUser(e, user?.id)}
                                  >
                                    <i className="las la-trash"></i>
                                  </button> */}
                                </td>
                              </tr>
                            </Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
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

        {/* <!-- postUser Modal --> */}
        <div
          className="modal right modal_custom fade"
          id="myModal3"
          tabIndex={1}
          role="dialog"
          data-backdrop="static"
          data-keyboard="false"
          aria-labelledby="myModalLabel2"
        >
          <div className="modal-dialog" role="document">
            <form onSubmit={handlelManageUser}>
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Add Permissions</h4>
                  <button
                    type="button"
                    className="close"
                    id="idButtonPost"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <i className="ra ra-close"></i>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label className="control-label d-block">
                      Name <span className="text-danger">*</span>
                    </label>
                    <AsyncSelect
                      cacheOptions
                      required
                      onChange={onChangeSelectedOption}
                      loadOptions={loadOptions}
                      defaultOptions
                      placeholder="Please Select"
                    />
                    <span className="invalid-feedback">
                      {nameError === true
                        ? "Please select name from the list"
                        : ""}
                    </span>
                  </div>
                  <div className="form-group">
                    <label className="control-label">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      required
                      readOnly
                      value={userData?.email}
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">
                      Designation <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      required
                      readOnly
                      value={userData?.designation}
                    />
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
                  <div className="form-group">
                    <label className="control-label d-block">
                      Role <span className="text-danger">*</span>
                    </label>
                    <select
                      onChange={handelRolePost}
                      required
                      className="form-control"
                    >
                      <option value="">Please Select</option>
                      {roleFilter?.map((role: any) => {
                        return (
                          <Fragment>
                            <option key={role?.id} value={role?.id}>
                              {role?.title}
                            </option>
                          </Fragment>
                        );
                      })}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="control-label">
                      Category <span className="text-danger">*</span>
                    </label>
                    <Multiselect
                      options={categoryListData?.payload?.map(
                        (item: string) => {
                          return item;
                        }
                      )}
                      displayValue="name"
                      id="id"
                      selectedValues={categoryList}
                      onSelect={setCategoryList}
                      onRemove={setCategoryList}
                    />
                  </div>

                  <div className="form-group">
                    <label className="control-label">
                      Sub-Category <span className="text-danger">*</span>
                    </label>
                    <Multiselect
                      options={subCategoryListData?.payload?.map(
                        (item: string) => {
                          return item;
                        }
                      )}
                      displayValue="name"
                      id="id"
                      selectedValues={subCategoryList}
                      onSelect={setSubCategoryList}
                      onRemove={setSubCategoryList}
                    />
                    <span className="invalid-feedback">
                      {subCatError === true
                        ? "Please select  from the list"
                        : ""}
                    </span>
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
                                    readOnly
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
                          </tr>
                        </thead>
                        <tbody>
                          {permissionData?.map(
                            (permissionName: any, index: any) => {
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
                            }
                          )}
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

        {/* <!-- User Update Modal Start --> */}
        <div
          className="modal right modal_custom fade"
          id="myModal4"
          tabIndex={1}
          role="dialog"
          data-backdrop="static"
          data-keyboard="false"
          aria-labelledby="myModalLabel2"
        >
          <div className="modal-dialog" role="document">
            <form onSubmit={handlelManageUpdateUser}>
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Edit Permissions</h4>
                  <button
                    type="button"
                    className="close"
                    id="idButtonUpdate"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <i className="ra ra-close"></i>
                  </button>
                </div>

                <div className="modal-body">
                  <div className="form-group">
                    <label className="control-label d-block">
                      Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      defaultValue={
                        adminManageUserOneData?.payload?.userData?.name
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      defaultValue={
                        adminManageUserOneData?.payload?.userData?.email
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">
                      Designation <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      defaultValue={
                        adminManageUserOneData?.payload?.userData?.designation
                      }
                    />
                  </div>
                  <div className="form-group row">
                    <label className="control-label col-md-2">Active</label>
                    <div className="toggle col-md-10">
                      <label>
                        <input
                          type="checkbox"
                          onClick={updateHandleActive}
                          defaultChecked={
                            adminManageUserOneData?.payload?.userData?.isActive
                          }
                        />
                        <span className="button-indecator"></span>
                      </label>
                    </div>
                  </div>{" "}
                  <div className="form-group">
                    <label className="control-label d-block">
                      Role <span className="text-danger">*</span>
                    </label>
                    <select onChange={handelRolePost} className="form-control">
                      {roleFilter?.map((role: any) => {
                        return (
                          <Fragment>
                            <option
                              key={role?.id}
                              selected={
                                adminManageUserOneData?.payload?.userData?.role
                                  ?.id === role?.id
                              }
                              value={role?.id}
                            >
                              {role?.title}
                            </option>
                          </Fragment>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="control-label">
                      Category <span className="text-danger">*</span>
                    </label>
                    <Multiselect
                      options={categoryListData?.payload?.map(
                        (item: string) => {
                          return item;
                        }
                      )}
                      displayValue="name"
                      id="id"
                      selectedValues={categoryList}
                      onSelect={setCategoryList}
                      onRemove={setCategoryList}
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">
                      Sub-Category <span className="text-danger">*</span>
                    </label>
                    <Multiselect
                      options={subCategoryListData?.payload?.map(
                        (item: string) => {
                          return item;
                        }
                      )}
                      displayValue="name"
                      id="id"
                      selectedValues={subCategoryList}
                      onSelect={setSubCategoryList}
                      onRemove={setSubCategoryList}
                    />
                    <span className="invalid-feedback">
                      {subCatError === true
                        ? "Please select  from the list"
                        : ""}
                    </span>
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
                                    readOnly
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
                          </tr>
                        </thead>
                        <tbody>
                          {permissionData?.map(
                            (permissionName: any, index: any) => {
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
                            }
                          )}
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

        <div
          className="modal right modal_custom fade"
          id="myModal5"
          tabIndex={1}
          role="dialog"
          data-backdrop="static"
          data-keyboard="false"
          aria-labelledby="myModalLabel2"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">View User</h4>
                <button
                  type="button"
                  className="close"
                  id="idButtonUpdate"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ra ra-close"></i>
                </button>
              </div>

              <div className="modal-body">
                <div className="form-group">
                  <label className="control-label d-block">
                    Name <span className="text-danger">*</span>
                  </label>

                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={adminManageUserOneData?.payload?.userData?.name}
                  />
                </div>
                <div className="form-group">
                  <label className="control-label">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={adminManageUserOneData?.payload?.userData?.email}
                  />
                </div>
                <div className="form-group">
                  <label className="control-label">
                    Designation <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    defaultValue={
                      adminManageUserOneData?.payload?.userData?.designation
                    }
                  />
                </div>
                <div className="form-group row">
                  <label className="control-label col-md-2">Active</label>
                  <div className="toggle col-md-10">
                    <label>
                      <input
                        readOnly
                        type="checkbox"
                        defaultChecked={
                          adminManageUserOneData?.payload?.userData?.isActive
                        }
                      />
                      <span className="button-indecator"></span>
                    </label>
                  </div>
                </div>{" "}
                <div className="form-group">
                  <label className="control-label d-block">
                    Role <span className="text-danger">*</span>
                  </label>
                  <select disabled className="form-control">
                    {roleFilter?.map((role: any) => {
                      return (
                        <Fragment>
                          <option
                            key={role?.id}
                            selected={
                              adminManageUserOneData?.payload?.userData?.role
                                ?.id === role?.id
                            }
                            value={role?.id}
                          >
                            {role?.title}
                          </option>
                        </Fragment>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group">
                  <label className="control-label">
                    Category <span className="text-danger">*</span>
                  </label>
                  <Multiselect
                    displayValue="name"
                    id="id"
                    selectedValues={categoryList}
                  />
                </div>
                <div className="form-group">
                  <label className="control-label">
                    Sub-Category <span className="text-danger">*</span>
                  </label>
                  <Multiselect
                    displayValue="name"
                    id="id"
                    selectedValues={subCategoryList}
                  />
                  <span className="invalid-feedback">
                    {subCatError === true ? "Please select  from the list" : ""}
                  </span>
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
                        {permissionData?.map(
                          (permissionName: any, index: any) => {
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
                          }
                        )}
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

export default Assign_Permissions;
