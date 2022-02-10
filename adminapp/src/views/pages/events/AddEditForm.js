import React, { useState, Fragment  } from 'react'
import { Editor } from "@tinymce/tinymce-react";
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {
  CCard,
  CCardBody,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CTabs,
  CTabPane,
  CTabContent,
  CCardHeader,
  CNavItem,
  CNavLink,
  CNav
} from '@coreui/react'
//import { MultiSelect } from "react-multi-select-component";
import '../TextEditors.scss'
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import api_url from './../../Apiurl';
import axios from "axios";
import Swal from "sweetalert2";



const AddEditForm = ({ match }) => {
  const [active, setActive] = useState(0)


  let history = useHistory();
  const {
    handleSubmit,
    setValue,
    control,    
    trigger,
    formState: { errors },
  } = useForm({    
    defaultValues: {
      sessionTitle: [{ name: "default Value" }],
      sessionDescription: [{ name: "default Value" }],
      sessionURL: [{ name: "default Value" }],
      videoURL: [{ name: "default Value" }],
      webPageUrl: [{ name: "default Value" }],
    }
  });

 
  const [isEditMode, setisEditMode] = React.useState(0);
 
  const [menuList, setMenuList] = React.useState([]);
  const [setectimage, setSetectimage] = React.useState(0);
  const [selectedFile, setSelectedFile] = useState();
  const [selectedTag, setSelectedTag] = React.useState([])
  const [selectedRole, setSelectedRole] = React.useState([])
  const [draftStatus, setDraftStatus] = React.useState(0)

  const [contentEditor, setContentEditor] = useState();
  const handleEditorChange = (content, editor) => {
    setContentEditor(content);
  }

  const changeFileHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event) => {
        setSetectimage(event.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
      setSelectedFile(event.target.files[0]);
    }
  };

  //const initialText = ``;


  React.useEffect(() => {
    
    axios.get(api_url + "/common/menuList", {})
      .then((result) => {
        if (result.data.status) {
          var menudata = result.data.response.data;         
          setMenuList(menudata);
        } else {
          Swal.fire("Oops...", result.data.response.msg, "error");
        }
      })
      .catch((err) => { console.log(err); });
 

    if (match.params.id) {
      setisEditMode(1);
      axios.post(api_url + "/blog/getBlogDataById", { blog_id: match.params.id }, {})
        .then((result) => {
          if (result.data.status) {
            var usersdata = result.data.response.data;
            if (usersdata.draft_status) {
              setDraftStatus(usersdata.draft_status);
            } else {
              setDraftStatus(0);
            }
            setValue("title", usersdata.title);
            setValue("description", usersdata.description);
            setValue("purchase_type", usersdata.purchase_type);
            setSelectedRole(usersdata.selected_role);
            setValue("cost", usersdata.cost);
            setSelectedTag(usersdata.tag);
            setSetectimage(usersdata.image);
            setContentEditor(usersdata.description);
          } else {
            Swal.fire("Oops...", result.data.response.msg, "error");
          }
        })
        .catch((err) => { console.log(err); });
    }
  }, []);

  const updateInformationAct = (data) => {
    data.blog_id = match.params.id;
    data.description = contentEditor;
    data.user_role = selectedRole;
    data.tag = selectedTag;
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (selectedFile) {
      formData.append("image", selectedFile, selectedFile.name);
    }
    axios.post(api_url + "/blog/updateBlogByadmin", formData, {}).then((result) => {
      if (result.data.status) {
        Swal.fire("Success!", result.data.response.msg, "success");
        if (draftStatus == 1) {
          history.push("/draft-blog");
        } else {
          history.push("/blog");
        }
      } else {
        Swal.fire("Oops...", result.data.response.msg, "error");
      }
    }).catch((err) => { console.log(err); });

  };

  

  const addInformationAct = async (data) => {
    data.description = contentEditor;
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (selectedFile) {
      formData.append("image", selectedFile, selectedFile.name);
    }
    console.log(finalFile);
    if (finalFile && finalFile.length > 0) {
      for (var i = 0; i < finalFile.length; i++) {
        formData.append("resources[]", finalFile[i], finalFile[i].name);
      }
    }


    axios.post(api_url + "/event/addPageByadmin", formData, {}).then((result) => {
      if (result.data.status) {
        Swal.fire("Success!", result.data.response.msg, "success");

      } else {
        Swal.fire("Oops...", result.data.response.msg, "error");
      }
    }).catch((err) => { console.log(err); });

  
  };
  
  const nextTab = async (tab) => {
    if (tab == 1){
      const result = await trigger(["title", "start_date", "end_date"]);
      if (result){
        setActive(tab);
      }
    }else{
      setActive(tab);
    }
  }

  const { fields: session, append: sessionAppend, remove: sessionRemove } = useFieldArray({
    control,
    name: 'sessionTitle',
    name: 'sessionDescription',
    name: 'sessionURL'
  });  

  const { fields: video, append: videoAppend, remove: videoRemove } = useFieldArray({
    control,
    name: 'videoURL'
  });

  const { fields: webPage, append: webPageAppend, remove: webPageRemove } = useFieldArray({
    control,
    name: 'webPageUrl'
  });

  const [file, setFile] = useState([{ type: '', name: '', file: [] }]);
  const [finalFile, setFinalFile] = useState([]);

  function uploadSingleFile(e) {  
    setFinalFile([...finalFile, (e.target.files[0])]);
    var type = '' 
    var ext = e.target.files[0].type;
    var arrayExtensions = ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp', 'image/gif'];
    if (arrayExtensions.lastIndexOf(ext.toLowerCase()) == -1) {
      type = 'doc';
    } else {
      type = 'image';
    }    
    setFile([...file, { type: type, name: e.target.files[0].name, file: URL.createObjectURL(e.target.files[0]) } ]);
  }

  function upload(e) {
    e.preventDefault();
    console.log(file);
  }

  function deleteFile(e) {
    const s = file.filter((item, index) => index !== e);
    setFile(s);
    setFinalFile(s);
  }


  return (
    <CRow>             
        <CCol xs="12" md="12" className="mb-4">
          <CCard>
          <CCardHeader>
            Add Event
          </CCardHeader>
          <CCardBody>
            <form onSubmit={handleSubmit((isEditMode === 1) ? updateInformationAct : addInformationAct)}>
              <CTabs activeTab={active} onActiveTabChange={idx => setActive(idx)}>
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink>
                    Event
                      {active === 0 && ' '}
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink>
                    Group Session
                      {active === 1 && ' '}
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink>
                   Resources
                      {active === 2 && ' '}
                    </CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent>
                  <CTabPane>
                    <br />
                    <CCol>
                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="title">Title <span className="label-validation">*</span></CLabel>
                            <Controller
                              name={"title"}
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { onChange, value } }) => (
                                <CInput
                                  type="text"                                  
                                  onChange={onChange}
                                  value={value}                                   
                                  placeholder={`Enter event title`}
                                />
                              )}
                            ></Controller>
                          </CFormGroup>
                          {errors.title && errors.title.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>Title is required.</p>
                          )}
                        </CCol>
                      </CRow>    

                      <CRow>
                        <CCol xs="6">
                          <CFormGroup>
                            <CLabel htmlFor="title">Start Date <span className="label-validation">*</span></CLabel>
                            <Controller
                              name={"start_date"}
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { onChange, value } }) => (
                                <ReactDatePicker
                                  className="form-control"
                                  selected={value}
                                  onChange={onChange}
                                  dateFormat="yyyy/MM/dd"
                                  dateFormatCalendar="yyyy/MM/dd"
                                  isClearable
                                  placeholderText="Start date"
                                />
                              )}
                            ></Controller>                            
                          </CFormGroup>
                          {errors.start_date && errors.start_date.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>Start date is required.</p>
                          )}
                        </CCol>
                        <CCol xs="6">
                          <CFormGroup>
                            <CLabel htmlFor="title">End Date <span className="label-validation">*</span></CLabel>
                            <Controller
                              name={"end_date"}
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { onChange, value } }) => (
                                <ReactDatePicker
                                  className="form-control"
                                  selected={value}
                                  onChange={onChange}
                                  dateFormat="yyyy/MM/dd"
                                  dateFormatCalendar="yyyy/MM/dd"
                                  isClearable
                                  placeholderText="End date"
                                />
                              )}
                            ></Controller>                            
                          </CFormGroup>
                          {errors.end_date && errors.end_date.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>End date is required.</p>
                          )}
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="password">Description</CLabel>
                            {/* <ReactQuill value={text} modules={modules} onChange={setText} /> */}

                            <Editor
                              apiKey="5w0ir8k2b6c9y5k3xrngkoskhxhvw6bm7y5qyfo6z8tlce6c"
                              cloudChannel="dev"
                              init={{
                                selector: "textarea",
                                plugins: "link image textpattern lists textcolor colorpicker",
                                toolbar: "undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code forecolor backcolor",
                              }}
                              value={contentEditor}
                              onEditorChange={handleEditorChange}

                            />
                          </CFormGroup>
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="title">Location</CLabel>
                            <Controller
                              name={"location"}
                              control={control}                              
                              render={({ field: { onChange, value } }) => (
                                <CInput
                                  type="location"
                                  onChange={onChange}
                                  value={value}                                  
                                  placeholder={`Enter event location`}
                                />
                              )}
                            ></Controller>
                          </CFormGroup>                          
                        </CCol>                       
                      </CRow>

                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="Organization">Organization</CLabel>
                            <Controller
                              name={"organization"}
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                <CInput
                                  type="text"
                                  onChange={onChange}
                                  value={value}                                  
                                  placeholder={`Enter organization`}
                                />
                              )}
                            ></Controller>
                          </CFormGroup>                          
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="ccnumber">Upload Image</CLabel>
                            <br />
                            <input
                              type="file"
                              accept=".png,.PNG,.JPG,.jpg,.jpeg"
                              name="myfile"
                              onChange={changeFileHandler}
                            />
                            {(isEditMode === 1) &&
                              <span>
                                {!setectimage && <img style={{ width: "100px" }} alt="avatar" src="company-logo.png" />}
                                {setectimage && <img style={{ width: "100px" }} src={setectimage} alt="user-image" />}
                              </span>
                            }
                            {(isEditMode !== 1 && setectimage != '') && <img style={{ width: "100px" }} src={setectimage} alt="user-image" />}
                          </CFormGroup>
                        </CCol>
                      </CRow>
                     
                      <CRow>
                        <CCol xs="12">
                          <button className="btn btn-outline-primary" type="button" onClick={() => nextTab(1)}>Next</button>                          
                        </CCol>
                      </CRow>  
                    </CCol>                    
                  </CTabPane>

                  <CTabPane>
                    <CCol>
                      <br/>
                      {session.map((item, index) => (
                        <div key={item.id}>
                          <CCol xs="12">
                            <CRow>
                              <CLabel htmlFor="title">Group Session {index + 1}</CLabel>
                            </CRow>
                          </CCol>
                          <br/>
                          <CCol xs="12">
                            <CRow>
                              <CCol xs="11">
                                <CRow>
                                  <CCol xs="2"> <CLabel htmlFor="title">Title</CLabel> </CCol>
                                  <CCol xs="10">
                                    <CFormGroup>
                                      <Controller
                                        name={`sessionTitle.${index}.value`}
                                        control={control}
                                        defaultValue={item.value}
                                        render={({ field }) => <input type="text" placeholder={`Title`} className="form-control" {...field} />}
                                      />
                                    </CFormGroup>
                                  </CCol>
                                </CRow>
                                <CRow>
                                  <CCol xs="2"> <CLabel htmlFor="title">Description</CLabel> </CCol>
                                  <CCol xs="10">
                                    <CFormGroup>
                                      <Controller
                                        name={`sessionDescription.${index}.value`}
                                        control={control}
                                        defaultValue={item.value}
                                        render={({ field }) => <textarea rows="4" type="text" placeholder={`Description`} className="form-control" {...field} />}
                                      />
                                    </CFormGroup>
                                  </CCol>
                                </CRow>
                                <CRow>
                                  <CCol xs="2"> <CLabel htmlFor="title">URL</CLabel> </CCol>
                                  <CCol xs="10">
                                    <CFormGroup>
                                      <Controller
                                        name={`sessionURL.${index}.value`}
                                        control={control}
                                        defaultValue={item.value}
                                        render={({ field }) => <input type="text" placeholder={`URL`} className="form-control" {...field} />}
                                      />
                                    </CFormGroup>
                                  </CCol>
                                </CRow>
                              </CCol>
                              <CCol xs="1">
                                <div className="btn btn-danger"  onClick={() => sessionRemove(index)}>Delete</div>
                              </CCol>
                            </CRow>
                          </CCol>
                          <hr/>
                        </div>
                      ))}
                      <CRow>
                        <div className="col-md-12 text-right">
                          <button type="button" className="btn btn-success" onClick={() => sessionAppend({ value: "" })}>Add More Session</button>
                        </div>
                      </CRow>     
                      <CRow>
                        <CCol xs="12">
                          <button className="btn btn-outline-primary" type="button" onClick={() => nextTab(2)}>Next</button>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CTabPane>
                  <CTabPane>  

                    <CCol>
                      <br />
                      <CCol xs="12">
                        <CRow>
                          <CLabel htmlFor="title"><b>Resource</b></CLabel>
                        </CRow>
                      </CCol>
                      <CRow>
                        <CCol xs="12">
                          <CRow>
                            <CCol xs="9">
                              <CFormGroup>
                                <input type="file" className="form-control" onChange={uploadSingleFile} />
                              </CFormGroup>
                            </CCol>
                            <CCol xs="3">
                              <button type="button" className="btn btn-outline-primary btn-block" onClick={upload}>Upload</button>
                            </CCol>
                          </CRow>
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol xs="12">
                          <CRow>
                            <CCol xs="12">
                              {file.length > 0 &&
                                file.map((item, index) => {
                                  return (
                                    <div>
                                      {index > 0 &&
                                        <div>
                                          <CRow key={index}>
                                            <CCol xs="4">
                                              {item.type == 'image' && <img style={{ width: '50px', height: '50px' }} src={item.file} alt="" />}
                                              {item.type == 'doc' && item.name}
                                            </CCol>
                                            <CCol xs="6">
                                              <button type="button" className="btn btn-danger" onClick={() => deleteFile(index)}>delete</button>
                                            </CCol>
                                          </CRow>
                                          <hr />
                                        </div>
                                      }
                                    </div>
                                  );
                                })}
                            </CCol>
                          </CRow>
                        </CCol>
                      </CRow>
                    </CCol>

                    <hr />


                    <CCol>                      
                      <CCol xs="12">
                        <CRow>
                          <CLabel htmlFor="title"><b>Video URL</b></CLabel>
                        </CRow>
                      </CCol>
                      {video.map((item, index) => (
                        <div key={item.id}>  
                          <br />
                          <CRow>
                            <CCol xs="12">
                              <CRow>
                                <CCol xs="1">
                                  <CRow>
                                    <CLabel htmlFor="title">Url {index + 1}</CLabel>
                                  </CRow>
                                </CCol>
                                <CCol xs="10">
                                  <CFormGroup>
                                    <Controller
                                      name={`videoURL.${index}.value`}
                                      control={control}
                                      defaultValue={item.value}
                                      render={({ field }) => <input type="text" placeholder={`Video url`} className="form-control" {...field} />}
                                    />
                                  </CFormGroup>
                                </CCol>
                                <CCol xs="1">
                                  <div className="btn btn-danger" onClick={() => videoRemove(index)}>Delete</div>
                                </CCol>
                              </CRow>    
                            </CCol>
                          </CRow>                          
                        </div>
                      ))}
                      <div className="row">
                        <div className="col-md-12 text-right">
                          <button type="button" className="btn btn-success" onClick={() => videoAppend({ value: "" })}>Add More Video</button>
                        </div>
                      </div>
                    </CCol>

                    <hr/>

                    <CCol>                      
                      <CCol xs="12">
                        <CRow>
                          <CLabel htmlFor="title"><b>Web Page URL</b></CLabel>
                        </CRow>
                      </CCol>
                      {webPage.map((item, index) => (
                        <div key={item.id}>
                          <br />
                          <CRow>
                            <CCol xs="12">
                              <CRow>
                                <CCol xs="1">
                                  <CRow>
                                    <CLabel htmlFor="title">WebUrl {index + 1}</CLabel>
                                  </CRow>
                                </CCol>
                                <CCol xs="10">
                                  <CFormGroup>
                                    <Controller
                                      name={`webPageUrl.${index}.value`}
                                      control={control}
                                      defaultValue={item.value}
                                      render={({ field }) => <input type="text" placeholder={`web Page url`} className="form-control" {...field} />}
                                    />
                                  </CFormGroup>
                                </CCol>
                                <CCol xs="1">
                                  <div className="btn btn-danger" onClick={() => webPageRemove(index)}>Delete</div>
                                </CCol>
                              </CRow>
                            </CCol>
                          </CRow>
                        </div>
                      ))}
                      <div className="row">
                        <div className="col-md-12 text-right">
                          <button type="button" className="btn btn-success" onClick={() => webPageAppend({ value: "" })}>Add More Web Url</button>
                        </div>
                      </div>
                    </CCol>

                   
                  

                  </CTabPane>
                </CTabContent>
              </CTabs>
              <br/>
              <hr/>
              <center>
                <button type="submit" className="btn btn-outline-primary">Save</button>
              </center>              
            </form>
          </CCardBody>
        </CCard>
      </CCol>

     
    </CRow>
  )
}

export default AddEditForm
