package com.rsys.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rsys.dto.ResponseDTO;
import com.rsys.services.impls.BillPdfService;
import com.rsys.services.impls.UserPdfService;
import com.rsys.services.interfaces.IUserServices;

@RestController
@CrossOrigin
@RequestMapping("/api/user")
public class PdfController {

    @Autowired
    private UserPdfService pdfService;
    @Autowired
    private IUserServices userServices;
    
    @Autowired
    private BillPdfService billPdfService;

    @GetMapping("/test_pdf" )
    public ResponseDTO<?>  sendEmail(){
        try {
        	pdfService.createPdf(userServices.getUserAll());
            return new ResponseDTO<>(HttpStatus.OK,null,"Sucessfull login...");

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseDTO<>(HttpStatus.OK,null,"Sucessfull...");
        }
	
    }
    @GetMapping("/test_pdf1" )
    public ResponseDTO<?>  sendEmail2(){
        try {
        	pdfService.export(userServices.getUserAll());
            return new ResponseDTO<>(HttpStatus.OK,null,"Sucessfull login...");

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseDTO<>(HttpStatus.OK,null,"Sucessfull...");
        }
	
    }
    
    @GetMapping("/test-pdf-email" )
    public ResponseDTO<?>  sendEmail4(){
        try {
        //	pdfService.export(userServices.getUserAll());
        	billPdfService.invoiceBill(19);
            return new ResponseDTO<>(HttpStatus.OK,null,"Sucessfull login...");

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseDTO<>(HttpStatus.OK,null,"Sucessfull...");
        }
	
    }
    @GetMapping("/invoice-bill" )
    public ResponseDTO<?>  invoiceBill(){
        try {
        	pdfService.invoiceBill(5);
            return new ResponseDTO<>(HttpStatus.OK,null,"Sucessfull login...");
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseDTO<>(HttpStatus.OK,null,"Sucessfull...");
        }
	
    }
    
    @GetMapping("/test_xls" )
    public ResponseDTO<?>  sendEmail3(){
        try {
        	pdfService.createExcell(userServices.getUserAll());
            return new ResponseDTO<>(HttpStatus.OK,null,"Sucessfull login...");

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseDTO<>(HttpStatus.OK,null,"Sucessfull...");
        }
	
    }

}
