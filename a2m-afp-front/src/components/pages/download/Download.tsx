import React, { useEffect, useState } from 'react'
import { AfpTab } from '../../../utils/afp/tab'
import ListProject from './ListProject'
import DownloadHistory from './DownloadHistory'

export default function Download() {



  const [tab, setTab] = useState<any>(0)

  useEffect(() => {
    AfpTab.showTab(0);
  }, [])

  const tabClick = (tabIndex: number) => {
    AfpTab.showTab(tabIndex);
    setTab(tabIndex);
  }
  return (
    <>
      <article className="content-area">
        <div className="tit-area">
          <h1 className="heading1">Download</h1>
        </div>
        <div className="tab-wrap">
          <div className="tab-type2">
            <div className="tab-menu">
              <button onClick={() => { tabClick(0) }} className="tab-btn">List projects</button>
              <button onClick={() => { tabClick(1) }} className="tab-btn">Download history</button>
              <div className="tab-indicator"></div>
            </div>

            <div className="tab-content active">
              {
                tab == 0 ?
                  <ListProject></ListProject>
                  :
                  <DownloadHistory></DownloadHistory>
              }
            </div>
          </div>
        </div>
      </article>
    </>
    // <div className='board-lst' style={{ width: "100%", overflowY: "scroll" }}>
    //   <article className='content-area'>
    //     <div className="tit-area">
    //       <h1 className='heading1'>List Project</h1>
    //     </div>
    //     <div className="tab-wrap">
    //       {
    //         lstCategory.length > 0 ? lstCategory.map((ele: any) => (
    //           <div key={ele.id}>

    //             {
    //               ele.projects.length > 0 ?
    //                 <>
    //                   <h2 className='heading2'>
    //                     {ele.name}
    //                   </h2>
    //                   <ul className="tab-board-lst">
    //                     {
    //                       ele.projects.map((project: any) => (
    //                         <li key={project.projectId}>
    //                           <div className="row row1">
    //                             <span className="subject">{project.projectName} - {project.version}</span>
    //                             <div className="utility">
    //                               <button className="btn2">Download</button>
    //                             </div>
    //                           </div>
    //                           <div className="row row2">
    //                             <div className="info-wrap">
    //                               <span>{project.description}</span>
    //                             </div>
    //                           </div>
    //                           <div className="row row3">
    //                             <div className="info-wrap">
    //                               <span>{project.organization}</span>
    //                             </div>
    //                           </div>
    //                           <div className="row row4">
    //                             <div className="info-wrap">
    //                               <span className="date">Last update: {Intl.DateTimeFormat("en-GB").format(new Date(project.updatedDate))}</span>
    //                             </div>
    //                           </div>


    //                           {
    //                             project.tags.length > 0 ?
    //                               <div className="row row1">
    //                                 <div className="info-wrap">
    //                                   {
    //                                     project.tags.map((tag: any) => (
    //                                       <span className='badge' key={tag.tagId}>{tag.tagName}</span>
    //                                     ))
    //                                   }
    //                                 </div>
    //                               </div>
    //                               : <></>
    //                           }
    //                         </li>
    //                       ))
    //                     }
    //                   </ul>
    //                 </>

    //                 :
    //                 <></>
    //             }
    //           </div>

    //         )

    //         )
    //           :
    //           <li className="no-data">No data</li>
    //       }
    //     </div>
    //   </article>
    //   <article className='content-area' style={{ marginTop: "30px" }}>
    //     <div className="tit-area">
    //       <h1 className='heading1'>Download history</h1>
    //     </div>
    //     <div className="tab-wrap">
    //       <ul className="tab-board-lst">
    //         {
    //           lstHisDownload.length > 0 ? lstHisDownload.map((ele: any) => (
    //             <li key={ele.id}>
    //               <div className="row row1">
    //                 <div className="row row1">
    //                   <div className='col1' style={{marginRight: "50px"}}>
    //                   <span className="subject">{ele.projectNameCustom}</span>
    //                   <span>Downloaded date: {Intl.DateTimeFormat("en-GB").format(new Date(ele.downloadedDate))}</span>
    //                 </div>
    //                 <div className="col2">
    //                   <span className="subject">{ele.projectName}-{ele.version}</span>
    //                   <div className="row row2">
    //                     <div className="info-wrap">
    //                       <span>{ele.projectDescription}</span>
    //                     </div>
    //                   </div>
    //                   <div className="row row3">
    //                     <div className="info-wrap">
    //                       <span>{ele.projectOrganization}</span>
    //                     </div>
    //                   </div>
    //                   <div className="row row4">
    //                     <div className="info-wrap">
    //                       <span className="date">Last update: {Intl.DateTimeFormat("en-GB").format(new Date(ele.updatedDate))}</span>
    //                     </div>
    //                   </div>


    //                   {
    //                     ele.tags.length > 0 ?
    //                       <div className="row row1">
    //                         <div className="info-wrap">
    //                           {
    //                             ele.tags.map((tag: any) => (
    //                               <span className='badge' key={tag.tagId}>{tag.tagName}</span>
    //                             ))
    //                           }
    //                         </div>
    //                       </div>
    //                       : <></>
    //                   }
    //                 </div>
    //                 </div>

    //                 <div className="utility">
    //                   <button className="btn2">Download again</button>
    //                 </div>
    //               </div>


    //               <div className="row row2">
    //                 <div className="info-wrap">
    //                   <span className="user-name">Features:</span>
    //                   {
    //                     ele.features.map((item: any) =>(
    //                       <div>{item}</div>
    //                     ))
    //                   }
    //                 </div>
    //               </div>
    //             </li>

    //           ))
    //             :
    //             <li className="no-data">No data</li>
    //         }
    //       </ul>

    //     </div>
    //   </article>
    // </div>


  )
}