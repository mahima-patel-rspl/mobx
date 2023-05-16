import React, { Fragment, useEffect, useMemo, useState } from "react";
import ComponentFooter from "./Component_Footer";
import ComponentHeader from "./Component_Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  adminManageComponentsGetViewRequest,
  adminManageCompsaveDataPost,
  componentStatus,
  adminTagListGet,
} from "../../redux/action/adminAction";
import moment from "moment";
import Chip from "@mui/material/Chip";
import { Autocomplete, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import ComponentNavbar from "./componentNavbar";
import { roleName, userPermission } from "./auth/authUser";
// import { AllTags, AdminTagList } from "./InterfaceTypes";
import { Permissions } from "../../constants/PermissionConstant";
import { ManageComponentStore } from "../../store/manageComponentsStore";
import { useStore } from "../../hooks/useStore";
import { observer } from "mobx-react-lite";
function Edit_Manage_Components() {
  const {
    rootStore: { manageComponentStore },
  } = useStore();
  // console.log(
  //   "manageComponentStore",
  //   manageComponentStore.adminEditManageComponent
  // );

  const dispatch = useDispatch<AppDispatch>();
  let compId = useParams();
  const navigate = useNavigate();

  // const { adminManageComponentsGetview } = useSelector(
  //   (state: any) => state?.adminManageComponentsGetview
  // );

  // const { adminTagList } = useSelector((state: any) => state?.adminTagList);
  // manageComponentStore.fetchAdminTagList();

  const [formData, setFormData] = useState<any>({});
  const [compData, setCompData] = useState<any>([]);
  const [compImg, setCompImg] = useState(
    // adminManageComponentsGetview?.payload?.image_url
    manageComponentStore.adminEditManageComponent?.image_url
  );
  const [techImg, setTechImg] = useState(
    // adminManageComponentsGetview?.payload?.techstack?.avatar_url
    manageComponentStore.adminEditManageComponent?.techstack?.avatar_url
  );

  // permission updateMetaDetail
  let allowUpdatePermission = userPermission().filter(
    (id: any) => id === Permissions.UpdateComponentMetadetails
  );

  // permission PublishComponent
  let allowPublishPermission = userPermission().filter(
    (id: any) => id === Permissions.PublishComponent
  );

  const imageHandler1 = (e: any) => {
    const reader = new FileReader();
    setFormData({
      ...formData,
      componentImg: e.target.files[0],
    });
    reader.onload = () => {
      if (reader.readyState === 2) {
        setCompImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const imageHandler2 = (e: any) => {
    const reader = new FileReader();
    setFormData({
      ...formData,
      techstackImg: e.target.files[0],
    });
    reader.onload = () => {
      if (reader.readyState === 2) {
        setTechImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleCompStatus = async (flag: boolean) => {
    let Obj = {} as Object;
    Obj = {
      // id: adminManageComponentsGetview?.payload?.id,
      id: manageComponentStore.adminEditManageComponent?.id,
      publishFlag: flag,
    };
    // const componentStatusCode: any = await dispatch(
    //   componentStatus(Obj, formData)
    // );
    const componentStatusCode: any =
      await manageComponentStore.fetchAdminEditPublishComponent(Obj, formData);
    console.log("status", componentStatusCode?.status);

    if (componentStatusCode?.status === 200) {
      console.log("true");

      toast.success(flag === true ? "Data Published" : "Data Unpublished");
    }
    setTimeout(() => {
      navigate("/Manage_components");
    }, 1000);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // const postStatusCode: any = await dispatch(
    //   adminManageCompsaveDataPost(
    //     adminManageComponentsGetview?.payload?.id,
    //     formData
    //   )
    // );
    const postStatusCode: any =
      await manageComponentStore.fetchAdminEditSaveComponent(
        manageComponentStore.adminEditManageComponent?.id,
        formData
      );
    if (postStatusCode?.status === 200) {
      toast.success("Data Updated Successfully");
    }
    setTimeout(() => {
      navigate("/Manage_components");
    }, 1000);
  };

  useEffect(() => {
    // setCompImg(adminManageComponentsGetview?.payload?.image_url);
    setCompImg(manageComponentStore.adminEditManageComponent?.image_url);
    // setTechImg(adminManageComponentsGetview?.payload?.techstack?.avatar_url);
    setTechImg(
      manageComponentStore.adminEditManageComponent?.techstack?.avatar_url
    );
    manageComponentStore.fetchAdminTagList();

    setFormData({
      ...formData,
      componentImg: null,
      techstackImg: null,
      // display_name: adminManageComponentsGetview?.payload?.display_name,
      // features: adminManageComponentsGetview?.payload?.features,
      // functions: adminManageComponentsGetview?.payload?.functional_use,
      // tags: adminManageComponentsGetview?.payload?.component_tags?.map(
      //   (tag: AllTags) => tag.name
      // ),
      // functional_tags:
      //   adminManageComponentsGetview?.payload?.functional_tags?.map(
      //     (tag: AllTags) => tag.name
      //   ),
      // feature_tags: adminManageComponentsGetview?.payload?.feature_tags?.map(
      //   (tag: AllTags) => tag.name
      // ),
      display_name: manageComponentStore.adminEditManageComponent?.display_name,
      features: manageComponentStore.adminEditManageComponent?.features,
      functions: manageComponentStore.adminEditManageComponent?.functional_use,
      tags: manageComponentStore.adminEditManageComponent?.component_tags?.map(
        (tag: any) => tag.name
      ),
      functional_tags:
        manageComponentStore.adminEditManageComponent?.functional_tags?.map(
          (tag: any) => tag.name
        ),
      feature_tags:
        manageComponentStore.adminEditManageComponent?.feature_tags?.map(
          (tag: any) => tag.name
        ),
    });
  }, [manageComponentStore.adminEditManageComponent?.id]);

  useEffect(() => {
    document.body.className = "app d-flex flex-column h-100  nav-light";

    DataFun();
  }, []);

  const DataFun = async () => {
    // var comp: any = await dispatch(
    //   adminManageComponentsGetViewRequest(compId?.id)
    // );
    var comp: any = await manageComponentStore.fetchAdminEditManageComponent(
      compId?.id
    );
    setCompData(comp);
    // var tagList = await dispatch(adminTagListGet());
    var tagList = await manageComponentStore.fetchAdminTagList();
  };

  return (
    <Fragment>
      <div className="app bg-light">
        <header>
          <ComponentHeader />
          <ComponentNavbar />
        </header>

        {/* <!-- Main container --> */}
        <main className="flex-shrink-0">
          <section className="section_wrapper_sm">
            <form onSubmit={handleSubmit}>
              <div className="container container-fluid">
                <div className="tile_wrapper">
                  <div className="tilewp_header">
                    <div className="tilewp-left">
                      <h3 className="tilewp-title">Edit Manage Components</h3>
                    </div>
                    <div className="tilewp-right">
                      <div className="btn-groups">
                        <Link
                          className="btn apply btn-outline-primary mr-2"
                          to="/Manage_Components"
                        >
                          Cancel
                        </Link>

                        {allowPublishPermission.length !== 0 ? (
                          manageComponentStore.adminEditManageComponent
                            ?.status == "publish" ? (
                            <Link
                              to=""
                              onClick={() => handleCompStatus(false)}
                              className="btn apply btn-outline-primary mr-2"
                            >
                              Unpublish
                            </Link>
                          ) : manageComponentStore.adminEditManageComponent
                              ?.status == "draft" ? (
                            <Link
                              to=""
                              onClick={() => handleCompStatus(true)}
                              className="btn apply btn-outline-primary mr-2"
                            >
                              Publish
                            </Link>
                          ) : (
                            ""
                          )
                        ) : (
                          ""
                        )}

                        {allowUpdatePermission.length !== 0 ? (
                          <button className="btn reset btn-primary">
                            Save
                          </button>
                        ) : (
                          ""
                        )}

                        <ToastContainer />
                      </div>
                    </div>
                  </div>
                  <div className="tilewp-body">
                    <div className="editcomponent-wrapper">
                      <div className="editcompont-lt">
                        <div className="editcompont-header">
                          <div className="editcompont-header-lt">
                            <div className="form-group">
                              <label className="control-label">ID</label>
                              <div className="control-text">
                                {
                                  manageComponentStore.adminEditManageComponent
                                    ?.id
                                }
                              </div>
                            </div>
                            <div className="form-group">
                              <label className="control-label">Title</label>
                              <div className="control-text">
                                {
                                  manageComponentStore.adminEditManageComponent
                                    ?.title
                                }
                              </div>
                            </div>
                          </div>
                          <div className="editcompont-header-rt">
                            <div className="d-flex justify-content-end align-items-end">
                              <label
                                htmlFor="images"
                                className="drop-container"
                              >
                                <span className="drop-title">
                                  <img src={compImg} className="image" />
                                </span>
                                <input
                                  type="file"
                                  className="file-control imageFile"
                                  id="images1"
                                  accept="image/*"
                                  name="componentImage"
                                  onChange={imageHandler1}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="editcompont-form">
                          <div className="form-group">
                            <label className="control-label">
                              Display Name<span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Enter here"
                              onChange={(e: any) =>
                                setFormData({
                                  ...formData,
                                  display_name: e.target.value,
                                })
                              }
                              defaultValue={
                                manageComponentStore.adminEditManageComponent
                                  ?.display_name
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label className="control-label">Description</label>
                            <textarea
                              className="form-control"
                              rows={8}
                              placeholder="Enter Here"
                              onChange={(e: any) =>
                                setFormData({
                                  ...formData,
                                  description: e.target.value,
                                })
                              }
                              defaultValue={
                                manageComponentStore.adminEditManageComponent
                                  ?.description
                              }
                            ></textarea>
                          </div>
                          <div className="form-group">
                            <label className="control-label">
                              Feature Tags
                            </label>
                            {manageComponentStore.adminTagList &&
                              manageComponentStore.adminEditManageComponent && (
                                <Autocomplete
                                  multiple
                                  id="tags-filled"
                                  options={manageComponentStore.adminTagList?.feature_tags?.map(
                                    (item: any) => {
                                      return item.name;
                                    }
                                  )}
                                  onChange={(event, value: any) =>
                                    setFormData({
                                      ...formData,
                                      feature_tags: value,
                                    })
                                  }
                                  defaultValue={manageComponentStore.adminEditManageComponent.feature_tags?.map(
                                    (item: any) => {
                                      return item.name;
                                    }
                                  )}
                                  freeSolo
                                  renderTags={(
                                    value: readonly string[],
                                    getTagProps: any
                                  ) =>
                                    value.map(
                                      (option: string, index: number) => (
                                        <Chip
                                          variant="outlined"
                                          label={option}
                                          {...getTagProps({ index })}
                                        />
                                      )
                                    )
                                  }
                                  renderInput={(params: any) => (
                                    <TextField
                                      {...params}
                                      variant="filled"
                                      label="Select Tags"
                                      placeholder="Tags"
                                    />
                                  )}
                                />
                              )}
                          </div>
                          <div className="form-group">
                            <label className="control-label">Feature</label>
                            <textarea
                              className="form-control"
                              rows={4}
                              placeholder="Enter Here"
                              onChange={(e: any) =>
                                setFormData({
                                  ...formData,
                                  features: e.target.value,
                                })
                              }
                              defaultValue={
                                manageComponentStore.adminEditManageComponent
                                  ?.features
                              }
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="editcompont-rt">
                        <div className="editcompontRT-form">
                          <div className="editcompont-header">
                            <div className="editcompont-header-lt">
                              <div className="form-group">
                                <label className="control-label">
                                  Tech Stack
                                </label>
                                <div className="control-text">
                                  {
                                    manageComponentStore
                                      .adminEditManageComponent?.techstack?.name
                                  }
                                </div>
                              </div>
                            </div>
                            <div className="editcompont-header-rt">
                              <div className="d-flex justify-content-end align-items-end">
                                <label
                                  htmlFor="images"
                                  className="drop-container"
                                >
                                  <span className="drop-title">
                                    {/* <i className="las la-camera"></i> */}
                                    <img src={techImg} className="image" />
                                  </span>
                                  {roleName() === Permissions.Admin ? (
                                    <input
                                      type="file"
                                      className="file-control imageFile"
                                      id="images2"
                                      name="techstackImage"
                                      accept="image/*"
                                      onChange={imageHandler2}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="editcompont-form">
                            <div className="form-group">
                              <label className="control-label">
                                Git Lab Link
                                <span className="text-danger">*</span>
                              </label>
                              <div className="control-text">
                                {
                                  manageComponentStore.adminEditManageComponent
                                    ?.gitlab_url
                                }
                              </div>
                            </div>
                            <div className="form-group">
                              <label className="control-label">
                                Component Tags
                              </label>
                              {manageComponentStore.adminTagList &&
                                manageComponentStore.adminEditManageComponent && (
                                  <Autocomplete
                                    multiple
                                    id="tags-filled"
                                    options={manageComponentStore.adminTagList?.tags?.map(
                                      (item: any) => {
                                        return item.name;
                                      }
                                    )}
                                    onChange={(event, value: any) =>
                                      setFormData({
                                        ...formData,
                                        tags: value,
                                      })
                                    }
                                    defaultValue={manageComponentStore.adminEditManageComponent?.component_tags?.map(
                                      (item: any) => {
                                        return item.name;
                                      }
                                    )}
                                    freeSolo
                                    renderTags={(
                                      value: readonly string[],
                                      getTagProps: any
                                    ) =>
                                      value.map(
                                        (option: string, index: number) => (
                                          <Chip
                                            variant="outlined"
                                            label={option}
                                            {...getTagProps({ index })}
                                          />
                                        )
                                      )
                                    }
                                    renderInput={(params: any) => (
                                      <TextField
                                        {...params}
                                        variant="filled"
                                        label="Select Tags"
                                        placeholder="Tags"
                                      />
                                    )}
                                  />
                                )}
                            </div>
                            <div className="form-group">
                              <label className="control-label">
                                Functional Tags
                              </label>
                              {manageComponentStore.adminTagList &&
                                manageComponentStore.adminEditManageComponent && (
                                  <Autocomplete
                                    multiple
                                    id="tags-filled"
                                    options={manageComponentStore.adminTagList?.functionalTags?.map(
                                      (item: any) => {
                                        return item.name;
                                      }
                                    )}
                                    onChange={(event, value: any) =>
                                      setFormData({
                                        ...formData,
                                        functional_tags: value,
                                      })
                                    }
                                    defaultValue={manageComponentStore.adminEditManageComponent?.functional_tags?.map(
                                      (item: any) => {
                                        return item.name;
                                      }
                                    )}
                                    freeSolo
                                    renderTags={(
                                      value: readonly string[],
                                      getTagProps: any
                                    ) =>
                                      value.map(
                                        (option: string, index: number) => (
                                          <Chip
                                            variant="outlined"
                                            label={option}
                                            {...getTagProps({ index })}
                                          />
                                        )
                                      )
                                    }
                                    renderInput={(params: any) => (
                                      <TextField
                                        {...params}
                                        variant="filled"
                                        label="Select Tags"
                                        placeholder="Tags"
                                      />
                                    )}
                                  />
                                )}
                            </div>
                            <div className="form-group">
                              <label className="control-label">
                                Frameworks
                              </label>

                              {manageComponentStore.adminTagList &&
                                manageComponentStore.adminEditManageComponent && (
                                  <Autocomplete
                                    multiple
                                    id="tags-filled"
                                    options={manageComponentStore.adminTagList?.frameworks?.map(
                                      (item: any) => {
                                        return item?.name;
                                      }
                                    )}
                                    onChange={(event, value: any) =>
                                      setFormData({
                                        ...formData,
                                        frameworks: value,
                                      })
                                    }
                                    defaultValue={manageComponentStore.adminEditManageComponent?.framework_tags?.map(
                                      (item: any) => {
                                        return item?.name;
                                      }
                                    )}
                                    freeSolo
                                    renderTags={(
                                      value: readonly string[],
                                      getTagProps: any
                                    ) =>
                                      value.map(
                                        (option: string, index: number) => (
                                          <Chip
                                            variant="outlined"
                                            label={option}
                                            {...getTagProps({ index })}
                                          />
                                        )
                                      )
                                    }
                                    renderInput={(params: any) => (
                                      <TextField
                                        {...params}
                                        variant="filled"
                                        label="Select Tags"
                                        placeholder="Tags"
                                      />
                                    )}
                                  />
                                )}
                            </div>
                            <div className="form-group">
                              <label className="control-label">
                                Functional Use
                              </label>
                              <textarea
                                className="form-control"
                                rows={4}
                                placeholder="Enter Here"
                                onChange={(e: any) =>
                                  setFormData({
                                    ...formData,
                                    functions: e.target.value,
                                  })
                                }
                                defaultValue={
                                  manageComponentStore.adminEditManageComponent
                                    ?.functional_use
                                }
                              ></textarea>
                            </div>
                          </div>
                        </div>
                        <div className="editcompontRT-info">
                          <div className="form-group">
                            <label className="control-label">Version</label>
                            <div className="control-text">
                              {
                                manageComponentStore.adminEditManageComponent
                                  ?.version
                              }
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="control-label">Created On</label>
                            <div className="control-text">
                              {moment(
                                manageComponentStore.adminEditManageComponent
                                  ?.createdAt
                              )
                                .utc()
                                .format("MMM DD,YYYY")}
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="control-label">
                              Last Updated by
                            </label>
                            <div className="control-text">
                              {
                                manageComponentStore.adminEditManageComponent
                                  ?.updated_by
                              }
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="control-label">
                              Last Updated On
                            </label>
                            <div className="control-text">
                              {manageComponentStore.adminEditManageComponent
                                ?.updatedAt === null
                                ? "---"
                                : moment(
                                    manageComponentStore
                                      .adminEditManageComponent?.updatedAt
                                  )
                                    .utc()
                                    .format("MMM DD,YYYY")}
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="control-label">
                              Last Draft On
                            </label>
                            <div className="control-text">
                              {manageComponentStore.adminEditManageComponent
                                ?.draftAt === null
                                ? "---"
                                : moment(
                                    manageComponentStore
                                      .adminEditManageComponent?.draftAt
                                  )
                                    .utc()
                                    .format("MMM DD,YYYY")}
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="control-label">
                              Last Published On
                            </label>
                            <div className="control-text">
                              {manageComponentStore.adminEditManageComponent
                                ?.publishedAt === null
                                ? "---"
                                : moment(
                                    manageComponentStore
                                      .adminEditManageComponent?.publishedAt
                                  )
                                    .utc()
                                    .format("MMM DD,YYYY")}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tilewp-footer "></div>
                </div>
              </div>
            </form>
          </section>
        </main>

        <ComponentFooter />
      </div>
    </Fragment>
  );
}

export default observer(Edit_Manage_Components);
