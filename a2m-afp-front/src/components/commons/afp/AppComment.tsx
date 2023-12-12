import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { showAndHideSpinner } from "../../../reducers/spinnerSlice";
import { ComPostService } from "../../../services/common/ComPostService";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { AuthConstant } from "../../../constants/authConstant";
import { selectedCommentIdSelector } from "../../../reducers/threadSlice";



//using: param: postId (required), onChange is function if want to change parent component
type CommentProps = {
  postId: any,
  onChangePost?: (post: any) => void,
  hideLikePost?: boolean,
  isGetAll?: boolean
};

export default function AppComment(props: CommentProps) {
  const userInfo = useAppSelector(state => state.userInfo.userInfo)

  const PAGE_SIZE: number = 5;

  const { t, i18n } = useTranslation()

  const [searchModel, setSearchModel] = useState<any>({
    postId: props.postId,
    page: 0,
    size: PAGE_SIZE,
    differrence: 0,
    isGetAll: props.isGetAll == true ? true : false
  });

  const [comPostService] = useState<ComPostService>(new ComPostService());

  const dispatch = useAppDispatch();

  const [items, setItems] = useState<any[]>([]);

  const [totalItem, setTotalItem] = useState(NaN);

  const [post, setPost] = useState<any>({ isLike: "", likeNumber: NaN });

  const moveToCommentIdStore = useSelector(selectedCommentIdSelector);

  const [moveToComment, setMoveToComment] = useState(moveToCommentIdStore);

  const [model, setModel] = useState<any>({
    postId: props.postId,
    content: "",
    imageUrl: userInfo?.imgPathBase64,
    createdByNm: userInfo?.fullName,
    createdBy: userInfo?.userUid,
    likeNumber: 0,
    isLike: "N",
    isBookmark: "N"
  });

  useEffect(() => {
    setModel((prevModel: any) => ({
      ...prevModel,
      postId: props.postId,
      content: "",
      imageUrl: userInfo?.imgPathBase64,
      createdByNm: userInfo?.fullName,
      createdBy: userInfo?.userUid,
      likeNumber: 0,
      isLike: "N",
      isBookmark: "N"
      // Các thuộc tính khác từ props bạn muốn cập nhật trong model
    }));
    setItemEdit(NaN)
  }, [props.postId]);

  const [openAction, setOpenAction] = useState("");

  const [itemEdit, setItemEdit] = useState(NaN);

  const eventClickListener = useCallback((e: any) => {
    var container = $(".input-wrap");

    if (!container.is(e.target) && container.has(e.target).length === 0) {
      setItemEdit(NaN);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mouseup", eventClickListener);
    return () => {
      document.removeEventListener('mouseup', eventClickListener);
    }
  }, []);

  useEffect(() => {
    setItems([])
    setSearchModel({
      postId: props.postId,
      page: 0,
      size: PAGE_SIZE,
      differrence: 0,
      isGetAll: props.isGetAll == true ? true : false
    })
  }, [props.postId]);

  useEffect(() => {
    getData();
  }, [searchModel.postId, searchModel.page]);

  const getData = () => {
    comPostService
      .getAppCommentData(searchModel)
      .then((resp) => {
        if (resp.data.status) {
          let listComment = structuredClone(items);
          listComment.push(...resp.data.responseData.listComment)
          setItems(listComment);
          setPost(resp.data.responseData.postModel);
          setTotalItem(resp.data.responseData.totalComment)

        }
      })
      .catch((error) => { });
  };

  const handleChangeInput = (event: any) => {
    setModel({
      ...model,
      content: event.target.value,
    });
  };

  const preAddComment = async () => {
    let newComment = structuredClone(model);
    newComment.keyTime = new Date().getTime();
    newComment.content = newComment.content.trim()
    let tempItems = structuredClone(items);
    tempItems.unshift(newComment);
    setItems(tempItems);
    setTotalItem(totalItem + 1);
    setModel({
      postId: props.postId,
      content: "",
      imageUrl: userInfo?.imgPathBase64,
      createdByNm: userInfo?.fullName,
      createdBy: userInfo?.userUid,
      likeNumber: 0,
      isLike: "N",
      isBookmark: "N"
    });
    addComment(newComment, tempItems);
  }

  useEffect(() => {
    let tmpPost = structuredClone(post);
    tmpPost.commentNumber = totalItem;
    if (props.onChangePost) {
      props.onChangePost(tmpPost)
    }

  }, [totalItem]);


  const addComment = (newComment: any, tempItems: any[]) => {
    //dispatch(showAndHideSpinner(true));
    comPostService
      .comment(model)
      .then((resp) => {
        if (resp.data.status) {
          handleAddComment(resp.data.responseData, newComment, tempItems);
        }
        //dispatch(showAndHideSpinner(false));
      })
      .catch((error) => {
        //dispatch(showAndHideSpinner(false));
      });
  };

  const handleAddComment = (responseComment: any, newComment: any, tempItems: any[]) => {
    let index = tempItems.findIndex((item: any) => item.keyTime === newComment.keyTime);
    tempItems[index].id = responseComment.id;
    setItems(tempItems);

    //handle offset + - when add - delte
    let currentDifference = searchModel.differrence;
    setSearchModel({
      ...searchModel,
      differrence: currentDifference + 1
    })
  };

  const deleteComment = (id: number) => {
    Swal.fire({
      title: `${t("confirm.label.title")}`,
      text: `${t("confirm.label.message.delete")}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#809bf1",
      cancelButtonColor: "#727379",
      confirmButtonText: `${t("confirm.button.yes.text")}`,
      cancelButtonText: `${t("confirm.button.no.text")}`,
    }).then((result) => {
      if (result.value) {
        //dispatch(showAndHideSpinner(true));
        comPostService
          .deleteComment(id)
          .then((resp) => {
            if (resp.data.status) {
              handleDeleteComment(id);
              toast.success("Delete success")
            }
            //dispatch(showAndHideSpinner(false));
          })
          .catch((error) => {
            dispatch(showAndHideSpinner(false));
          });
      }
    });
  };

  const handleDeleteComment = (id: any) => {
    let index = items.findIndex((item: any) => item.id === id);

    let arr = structuredClone(items);

    arr.splice(index, 1);

    setItems(arr);

    setItemEdit(NaN);
    setTotalItem(totalItem - 1);

    //handle offset + - when add - delte
    let currentDifference = searchModel.differrence;
    setSearchModel({
      ...searchModel,
      differrence: currentDifference - 1
    })
  };

  const handleShiftEnter = () => {
    setModel({
      ...model,
      content: model.content,
    });
  };

  const handleUpdateSuccess = (eComment: any) => {
    let index = items.findIndex((item: any) => item.id === eComment.id);

    let arr = structuredClone(items);

    arr[index] = eComment;

    setItems(arr);

    setItemEdit(NaN);
  }

  const addLikeOrUnlike = () => {
    dispatch(showAndHideSpinner(true))
    comPostService.addLikeOrUnlike({ postId: post.id, isLike: post.isLike })
      .then(resp => {
        if (resp.data.status) {
          let tmpPost = structuredClone(post);
          tmpPost.isLike = post.isLike == "Y" ? "N" : "Y";
          tmpPost.likeNumber = post.isLike == "Y" ? post.likeNumber - 1 : post.likeNumber + 1;
          if (props.onChangePost) {
            props.onChangePost(tmpPost)
          }
          setPost(tmpPost);
        }
        dispatch(showAndHideSpinner(false))
      })
      .catch(error => {
        dispatch(showAndHideSpinner(false))
      })
  }

  const handleShowMore = () => {
    let currentPage = searchModel.page;
    setSearchModel({
      ...searchModel,
      page: currentPage + 1
    })
  }

  const eventListener = useCallback((e: any) => {
    var container = $("div .context-menu");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      setOpenAction('')
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mouseup', eventListener);
    return () => {
      document.removeEventListener('mouseup', eventListener);
    }
  }, [])

  return (
    <>
      {
        (!Number.isNaN(post.likeNumber) && props.hideLikePost != true) ? <>
          <div className="info-wrap">
            <button onClick={() => { addLikeOrUnlike() }} className={`like ${post.isLike == 'Y' ? "active" : ""}`}><em>{post.likeNumber}</em></button>
          </div>
        </> : <></>
      }
      <div className="comment-area">
        <div className="input-wrap">
          <span className="user-thumb">
            <img src={userInfo?.imgPathBase64 || ""} alt="예시이미지" onError={(event: any) => {
              event.target.src = "../../assets/images/users/user-dummy-img.jpg"
            }} />
          </span>
          <textarea
            value={model.content}
            onChange={handleChangeInput}
            rows={1}
            placeholder="Write a comment (Save : Enter / Line break : Shift + Enter)"
            onKeyUp={(e: any) => {
              if (e.key === "Enter" && e.shiftKey) {
                handleShiftEnter();
              } else if (e.key === "Enter" && model.content.trim()) {
                preAddComment();
              }
            }}
          ></textarea>
        </div>
        <br />
        <ul>
          {items.length > 0 ? (
            items.map((e) => (
              <li key={e.id ? e.id : e.keyTime}>
                {
                  itemEdit === e.id ?
                    <>
                      <CommentEdit goView={() => setItemEdit(NaN)} updateSuccess={(eComment: any) => { handleUpdateSuccess(eComment) }} item={e} />
                    </> :
                    <>
                      <CommentView onChange={(item: any) => { handleUpdateSuccess(item) }} doDolete={(id: number) => deleteComment(id)} goEdit={(id: number) => setItemEdit(id)} openAction={openAction} item={e} setOpenAction={(id: string) => { setOpenAction(id) }} moveToComment={moveToComment} />
                    </>
                }
              </li>
            ))
          ) : (
            <li className="no-data">No comment</li>
          )}
        </ul>

        {
          totalItem > items.length ? <>
            <button onClick={() => { handleShowMore() }} className="show-more">Show {totalItem - items.length > PAGE_SIZE ? PAGE_SIZE : totalItem - items.length} more comments</button>
          </> : ""
        }
      </div>
    </>
  );
}

type CommentEditProps = {
  item: any,
  updateSuccess: (eComment: any) => void,
  goView: () => void
};

export function CommentEdit(props: CommentEditProps) {
  const [item, setItem] = useState(props.item);
  const [comPostService] = useState<ComPostService>(new ComPostService());
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(state => state.userInfo.userInfo)

  useEffect(() => {
    setItem(props.item);
  }, [props.item]);

  const updateComment = () => {
    //dispatch(showAndHideSpinner(true));
    comPostService
      .comment(item)
      .then((resp) => {
        if (resp.data.status) {
          handleUpdateSuccess(resp.data.responseData);
        }
        //dispatch(showAndHideSpinner(false));
      })
      .catch((error) => {
        dispatch(showAndHideSpinner(false));
      });
  }

  const handleUpdateSuccess = (eComment: any) => {
    props.updateSuccess(eComment);
  }

  const handleChangeInput = (event: any) => {
    setItem({
      ...item,
      content: event.target.value,
    });
  };

  const handleShiftEnter = () => {
    setItem({
      ...item,
      content: item.content,
    });
  };

  const escapeKeyEvent = useCallback((e: any) => {
    if (e.key === "Escape") {
      props.goView()
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escapeKeyEvent);
    return () => {
      document.removeEventListener('mouseup', escapeKeyEvent);
    }
  }, []);

  return (
    <>
      <div className="input-wrap">
        <span className="user-thumb">
          <img src={userInfo?.imgPathBase64 || ""} alt="예시이미지" onError={(event: any) => {
            event.target.src = "../../assets/images/users/user-dummy-img.jpg"
          }} />
        </span>
        <textarea
          value={item.content}
          onChange={handleChangeInput}
          rows={1}
          placeholder="Write a comment (Save : Enter / Line break : Shift + Enter)"
          onKeyUp={(e: any) => {
            if (e.key === "Enter" && e.shiftKey) {
              handleShiftEnter();
            } else if (e.key === "Enter") {
              updateComment();
            }
          }}
        ></textarea>
      </div>
    </>
  );
}


type CommentViewProps = {
  openAction: string,
  item: any,
  moveToComment: any,
  setOpenAction: (id: string) => void
  goEdit: (id: number) => void,
  doDolete: (id: number) => void,
  onChange: (item: any) => void,
};

export function CommentView(props: CommentViewProps) {
  const [item, setItem] = useState(props.item);
  const [moveToComment, setMoveToComment] = useState(props.moveToComment);
  const [comPostService] = useState<ComPostService>(new ComPostService());
  const dispatch = useAppDispatch();

  useEffect(() => {
    setItem(props.item);
  }, [props.item]);

  useEffect(() => {
    scrollToComment();
  }, []);

  const userInfo = useAppSelector((state) => state.userInfo.userInfo);

  const userUid = userInfo.userUid

  const scrollToComment = () => {
    const element = document.getElementById(moveToComment);
    if (element) {
      element.scrollIntoView();
    }
  };

  const addLikeOrUnlike = () => {
    dispatch(showAndHideSpinner(true))
    comPostService.addLikeOrUnlike({ commentId: item.id, isLike: item.isLike })
      .then(resp => {
        if (resp.data.status) {
          let tmpItem = structuredClone(item);
          tmpItem.isLike = item.isLike == "Y" ? "N" : "Y";
          tmpItem.likeNumber = item.isLike == "Y" ? item.likeNumber - 1 : item.likeNumber + 1;
          setItem(tmpItem);
        }
        dispatch(showAndHideSpinner(false))
      })
      .catch(error => {
        dispatch(showAndHideSpinner(false))
      })
  }

  const bookmarkOrUnBookmark = () => {
    dispatch(showAndHideSpinner(true));
    comPostService
      .bookmarkOrUnBookmark({ commentId: item.id, isBookmark: item.isBookmark })
      .then((resp) => {
        if (resp.data.status) {
          let tmpItem = structuredClone(item);
          tmpItem.isBookmark = item.isBookmark == "Y" ? "N" : "Y";
          setItem(tmpItem);
          props.onChange(tmpItem)
        }
        dispatch(showAndHideSpinner(false));
      })
      .catch((error) => {
        dispatch(showAndHideSpinner(false));
      });
  };

  return (
    <>
      <div className="user-wrap" id={item.id} onLoad={scrollToComment}>
        <span className="user-thumb">
          <img src={item?.imageUrl || ""} alt="예시이미지" onError={(event: any) => {
            event.target.src = "../../../assets/images/users/user-dummy-img.jpg"
          }} />
        </span>
        <div className="user-info">
          <span className="user-name">{item.createdByNm}</span>
          <span className="user-date">
            {dayjs(item.createdDate).format("YYYY-MM-DD HH:mm")}
          </span>
        </div>
        {
          !Number.isNaN(item.likeNumber) ? <>
            <div className="info-wrap">
              <button onClick={() => { addLikeOrUnlike() }} className={`like ${item.isLike == 'Y' ? "active" : ""}`}><em>{item.likeNumber}</em></button>
              <button onClick={() => { bookmarkOrUnBookmark() }} className={`bookmark ${item.isBookmark == 'Y' ? "active" : ""}`}></button>
              {
                item.createdBy === userUid || (userInfo?.rolesStr || "").includes(AuthConstant.ROLE_ADMIN) ? (
                  <>
                    <button
                      className="more"
                      onClick={() => {
                        if (props.openAction == item.id) {
                          props.setOpenAction("");
                        } else {
                          props.setOpenAction(item.id);
                        }
                      }}
                    ></button>
                    <div className={`context-menu ${props.openAction == item.id ? "active" : ""}`}
                    >
                      {item.createdBy === userUid ?
                        <>
                          <button onClick={() => { props.goEdit(item.id) }} className="edit" >Edit</button>
                        </> : <></>

                      }

                      <button onClick={() => { props.doDolete(item.id) }} className="delete">Delete</button>
                    </div>
                  </>
                ) : null
              }
            </div>
          </> : <></>
        }

      </div>
      <div className="txt">{item.content}</div>
    </>
  );
}