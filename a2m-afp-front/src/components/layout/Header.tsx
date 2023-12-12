import { useEffect, useRef, useState } from "react";
// import { sideBarShowReducer } from "../../reducers/layoutSlice";
import { getUserInfo } from "../../reducers/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import Account from "./comp/Account";
// import MutilLanguage from "./comp/MutilLanguage";
import { useNavigate } from "react-router-dom";
import AppModal from "../commons/afp/AppModal";
import Bmk_0101 from "../pages/bmk/Bmk_0101";
import { getAnnounInfo } from "../../reducers/announSlice";
import { Doc0101Service } from "../../services/doc/Doc0101Service";
import { setSelectedSideBarMenuId, setSelectedTsstMenuId } from "../../reducers/docSideBarSlice";

export default function Header() {
  const dispatch = useAppDispatch();
  const navagite = useNavigate();

  const userInfo = useAppSelector(state => state.userInfo.userInfo)

  const announInfo = useAppSelector(state => state.announInfoStore.announInfo)

  const [openSearch, setOpenSearch] = useState(false)

  // const sideBarShow = useAppSelector((state) => state.layout.sideBarShow);
  const [showModalBookmark, setShowModalBookmark] = useState(false);

  const [lstResults, setLstResults] = useState<any>([])

  const [keySearch, setKeySearch] = useState("")

  const [doc0101Service] = useState<Doc0101Service>(new Doc0101Service());

  const searchDocRef = useRef<any>(null);
  const [isShowLoader, setIsShowLoader] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  useEffect(() => {
    dispatch(getAnnounInfo());
  }, []);

  const handleClickLink = (url: string) => {
    navagite(url)
  }

  const closeModalBookmark = (data?: any) => {
    setShowModalBookmark(false);
  }

  const onCloseBookmark = (event: any) => {

    setShowModalBookmark(false)
  }
  useEffect(() => {
    // const script = document.createElement('script');
    // script.src = process.env.PUBLIC_URL + "/assets/js/app.js";
    // script.async = true;
    // document.body.appendChild(script);
    // return () => {
    //     document.body.removeChild(script);
    // }
  }, []);

  useEffect(() => {
    setIsShowLoader(true);
    const search = setTimeout(() => {
      if(keySearch.trim()!= ''){
        doc0101Service.searchDoc({afpMenuName: keySearch}).then((res: any)=>{
          setLstResults(res.data.responseData);
          setIsShowLoader(false);
        });
      }
    }, 1000);
    return () => clearTimeout(search);
  }, [keySearch]);

  const handleChangeInput = (event:any)=>{
    setKeySearch(event.target.value);
  }

  const handleRedirect = (item:any) => {
    searchDocRef.current.value = '';
    setKeySearch("")  
    dispatch(setSelectedTsstMenuId(item.tsstMenuId));
    dispatch(setSelectedSideBarMenuId(item.id));
    navigate(item.tsstMenuUrl);
    
  }

  return (
    // style={!sideBarShow ? {left: 70} : {}}
    // <header
    //   id="page-topbar"
    //   className={`${!sideBarShow ? "className-sidebar-left" : ""}`}
    // >
    //   <div className="layout-width">
    //     <div className="navbar-header">
    //       <div className="d-flex">
    //         <div className="d-flex">
    //           <button
    //             type="button"
    //             className="btn btn-sm px-3 fs-16 vertical-menu-btn topnav-hamburger shadow-none"
    //             onClick={() => {
    //               var innerWidth = window.innerWidth;
    //               if (innerWidth > 1200) {
    //                 dispatch(sideBarShowReducer(!sideBarShow));
    //               } else if (innerWidth < 768) {
    //                 document.getElementById("trigger_menus")?.click();
    //               }
    //             }}
    //             id="topnav-hamburger-icon"
    //           >
    //             <span
    //               className={`hamburger-icon${!sideBarShow ? " open" : ""}`}
    //             >
    //               <span></span>
    //               <span></span>
    //               <span></span>
    //             </span>
    //           </button>
    //         </div>
    //         <div className="d-flex">
    //           <input
    //             type="text"
    //             className="form-control search_menu"
    //             placeholder="Search..."
    //           />
    //         </div>
    //       </div>
    //       <div className="d-flex align-items-center">
    //         <MutilLanguage />
    //         <Account />
    //       </div>
    //     </div>
    //   </div>
    //   <button className="btn btn-danger btn-icon" id="back-to-top">
    //     <i className="ri-arrow-up-line"></i>
    //   </button>
    // </header>
    <>
      <section>
        <article className="top-area">
          <h1 className="logo-wrap">
            <a href="/" className="logo"></a>
          </h1>
          <div className={`search-area ${openSearch ? 'active' : ''}`}>
            <button className="search-icon" onClick={() => {
              setOpenSearch(!openSearch);
              setKeySearch("")
            }} ></button>
            <input ref={searchDocRef} type="text" placeholder="search" onChange={(event) => { handleChangeInput(event) }} />
            {
              keySearch.trim() != "" &&
              <div className="result-search-area scroll-wrap">
                {
                  isShowLoader? <div className="search-loader"></div>
                  :
                  <ul className="lst-item-result">
                    {
                      lstResults.length > 0 ?
                        lstResults.map((item: any) => (
                          <li className="item-result" key={item.id} onClick={()=>handleRedirect(item)}>{item.name}</li>
                        ))
                        :
                        <li style={{textAlign: "center"}}>No result found</li>
                    }
                  </ul>
                }
                
                
              </div>
            }
          </div>
          <ul className="utility-area">
            <li>
              <a title="공지사항" className="announce" onClick={() => handleClickLink("/ann")}>
                {
                  announInfo.lastAnnounId > announInfo.lastViewId ? <>
                    <span className="new"></span>
                  </> : <></>
                }

              </a>
            </li>
            <li>
              <a title="북마크 패널" className="bookmark" onClick={() => {
                setShowModalBookmark(true)
              }}></a>
            </li>
            <li className="user-info-area">
              <div className="user-wrap">
                <div className="user-thumb">
                  <img src={userInfo?.imgPathBase64 || ""} alt="예시이미지" onError={(event: any) => {
                    event.target.src = "../../assets/images/users/user-dummy-img.jpg"
                  }} />
                </div>
                <button className="toggle-btn"></button>
              </div>
              {/* <div className="user-dropdown">
              <div className="user-info">
                <div className="user-thumb-mini"></div>
                <div className="user-name-team">
                  <span className="user-name">Choi jongmin</span>
                  <span className="user-team">개발2팀</span>
                </div>
              </div>
              <div className="user-dropdown-menu">
                <a title="프로필 편집" className="edit">Edit profile</a>
                <a title="관리자 설정" className="admin">Admin</a>
                <a title="로그아웃" className="out">sign out</a>
              </div>
            </div> */}
              <Account userInfo={userInfo} />
            </li>
          </ul>

        </article>
      </section>
      {
        showModalBookmark && (
          <AppModal open={showModalBookmark} title='Bookmark' titleIcon="xi-bookmark" onClose={closeModalBookmark} >
            <Bmk_0101 onClose={onCloseBookmark} />
          </AppModal>
        )
      }
    </>
  );
}
