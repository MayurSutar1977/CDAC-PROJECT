package com.rsys.dto;

import java.util.List;

public class ChartDataDto {
	private List<Integer> monthList;
	private List<Integer> countList;

	public ChartDataDto() {
		// TODO Auto-generated constructor stub
	}

	public ChartDataDto(List<Integer> monthList, List<Integer> countList) {
		super();
		this.monthList = monthList;
		this.countList = countList;
	}

	public List<Integer> getMonthList() {
		return monthList;
	}

	public void setMonthList(List<Integer> monthList) {
		this.monthList = monthList;
	}

	public List<Integer> getCountList() {
		return countList;
	}

	public void setCountList(List<Integer> countList) {
		this.countList = countList;
	}

	@Override
	public String toString() {
		return "ChartData \n\t monthList=" + monthList + ",\n\t countList=" + countList + "]";
	}

}
