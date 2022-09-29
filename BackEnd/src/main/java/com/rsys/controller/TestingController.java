package com.rsys.controller;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.charts.ChartDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rsys.dao.IRentBookingRepository;
import com.rsys.dto.ChartDataDto;

@RestController
public class TestingController {
	@Autowired
	IRentBookingRepository bookingRepository;

	@GetMapping("/count-test")
	public ChartDataDto getCount() {
		List<Integer> bookingPerMonth = new ArrayList<>();
		List<Integer> montsOfBookings = bookingRepository.getMontsOfBookings();
		for (Integer month : montsOfBookings) {
			bookingPerMonth.add(bookingRepository.countForMonth(month));
		}
		ChartDataDto chartDataDto = new ChartDataDto(montsOfBookings, bookingPerMonth);
		System.out.println(chartDataDto);

		return chartDataDto;

	}

}
