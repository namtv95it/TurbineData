import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import AppComment from "../../../commons/afp/AppComment";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import { ComPostService } from "../../../../services/common/ComPostService";
import { showAndHideSpinner } from "../../../../reducers/spinnerSlice";
import { AuthConstant } from "../../../../constants/authConstant";

type Ann_0101ViewProps = {
  modalData: any;
  onClose: (status: boolean) => void;
  bookmark: (postId: number, oldStatus: string) => void;
  onChangePost?: (post: any) => void;
  delete: (postId: number) => void;
  edit: (postId: number) => void;
};
export default function Ann_0101View(props: Ann_0101ViewProps) {
  const [announDto, setAnnounDto] = useState<any>(props.modalData);
  const [comPostService] = useState<ComPostService>(new ComPostService());
  const userInfo = useAppSelector(state => state.userInfo.userInfo)
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    comPostService.increasePostView(props.modalData.id)
        .then(resp => {
            if (resp.data.status) {
                let tmpPost = structuredClone( announDto );
                tmpPost.viewNumber = tmpPost.viewNumber+1
                if(props.onChangePost){
                    props.onChangePost(tmpPost);
                }
                setAnnounDto({
                    ...announDto,
                    viewNumber: tmpPost.viewNumber
                });
            } else {
                
            }
        })
        .catch(error => {

        })
  }, []);

  useEffect(() => {
    setAnnounDto(props.modalData);
  }, [props.modalData]);

  const [openAction, setOpenAction] = useState(false);

  const eventListener = useCallback((e: any) => {
    var container = $("div .context-menu");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      setOpenAction(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mouseup", eventListener);
    return () => {
      document.removeEventListener("mouseup", eventListener);
    };
  }, []);

  const bookmarkOrUnBookmark = (postId: number, oldStatus: string) => {
    dispatch(showAndHideSpinner(true));
    comPostService
      .bookmarkOrUnBookmark({ postId: postId, isBookmark: oldStatus })
      .then((resp) => {
        if (resp.data.status) {
          handleBookmark(postId, oldStatus);
        }
        dispatch(showAndHideSpinner(false));
      })
      .catch((error) => {
        dispatch(showAndHideSpinner(false));
      });
  };

  const handleBookmark = (postId: number, oldStatus: string) => {
    setAnnounDto({
      ...announDto,
      isBookmark: oldStatus === "Y" ? "N" : "Y",
    });
    props.bookmark(postId, oldStatus);
  };

  const handleChangePost = (post: any) => {
    if(props.onChangePost){
        props.onChangePost(post);
    }
    setAnnounDto( {
        ...announDto,
        commentNumber: post.commentNumber
    } )
  }

  return (
    <>
      <div className="modal-content-area">
        <div className="modal-announce-wrap">
          <div className="board-lst view-type-single">
            <div className="info-wrap">
              <span className="user-thumb">
              <img
                    src={announDto?.imageUrl || ""}
                    alt="예시이미지"
                    onError={(event: any) => {
                      event.target.src =
                        "../../../assets/images/users/user-dummy-img.jpg";
                    }}
                  />
              </span>
              <span className="user-name">{announDto.createdByNm}</span>
              <span className="date">
                {dayjs(announDto.createdDate).format("YYYY-MM-DD HH:mm")}
              </span>
              {/* <span className="time">15:00</span> */}
              <span className="line"></span>
              <span className="views">
                Views<em>{announDto.viewNumber}</em>
              </span>
              <span className="reply">
                Reply<em>{announDto.commentNumber}</em>
              </span>
            </div>
            <div className="utility">
              
              { 
                            (userInfo?.rolesStr || "").includes(AuthConstant.ROLE_ADMIN) ? (
                                <button
                onClick={() => {
                  setOpenAction(true);
                }}
                className="more"
              ></button>
                            ) : <Fragment />
                        }
              <div className={`context-menu ${openAction ? "active" : ""}`}>
                <button
                  onClick={() => {
                    props.edit(announDto.id);
                  }}
                  className="edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    props.delete(announDto.id);
                  }}
                  className="delete"
                >
                  Delete
                </button>
              </div>
              <button
                onClick={() => {
                  bookmarkOrUnBookmark(announDto.id, announDto.isBookmark);
                }}
                className={`bookmark ${
                  announDto.isBookmark == "Y" ? "active" : ""
                }`}
              ></button>
            </div>
            <div
              className="board-body"
              dangerouslySetInnerHTML={{ __html: announDto.description }}
            ></div>

            <AppComment
              postId={announDto.id}
              onChangePost={(post: any) => {
                handleChangePost(post)
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
