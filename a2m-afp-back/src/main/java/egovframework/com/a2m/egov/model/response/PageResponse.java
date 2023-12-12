package egovframework.com.a2m.egov.model.response;

import java.util.List;

/**
 * @author KetHX
 * @created 2/24/2023
 */
public class PageResponse {
	private List datas;
	private Integer count;
	private boolean checkHead;

	public PageResponse(List datas, Integer count) {
		this.datas = datas;
		this.count = count;
	}

	public PageResponse() {

	}

	public List getDatas() {
		return datas;
	}

	public void setDatas(List datas) {
		this.datas = datas;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public boolean isCheckHead() {
		return checkHead;
	}

	public void setCheckHead(boolean checkHead) {
		this.checkHead = checkHead;
	}
}
