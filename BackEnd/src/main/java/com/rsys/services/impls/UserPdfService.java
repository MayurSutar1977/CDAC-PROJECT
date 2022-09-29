package com.rsys.services.impls;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.mail.MessagingException;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.rsys.dao.IBookingDetailRepository;
import com.rsys.dao.IPaymentRepository;
import com.rsys.dao.IRentBookingRepository;
import com.rsys.dao.IUserAddressRepository;
import com.rsys.dao.IUserRepository;
import com.rsys.exception.UserException;
import com.rsys.pojos.entity.BookingDetail;
import com.rsys.pojos.entity.Payment;
import com.rsys.pojos.entity.RentBooking;
import com.rsys.pojos.entity.User;
import com.rsys.pojos.entity.UserAddress;
import com.rsys.pojos.enums.PaymentGatway;
import com.rsys.pojos.enums.UserRole;
import com.rsys.utils.NumberUtlity;

@Service
@Transactional
public class UserPdfService {
	@Autowired
	private IUserRepository userRepository;
	@Autowired
	private IUserAddressRepository addressRepository;
	@Autowired
	private IRentBookingRepository bookingRepository;
	@Autowired
	private IPaymentRepository paymentRepository;
	@Autowired
	private IBookingDetailRepository bookingDetailRepository;
	@Autowired
	private EmailService emailService;
	@Value("${file.upload.location}")
	private String location;

	public List<User> getAllUser() {
		return userRepository.findAll();
	}

	public boolean createPdf(List<User> Users) {
		Document document = new Document(PageSize.A4, 15, 15, 45, 30);
		try {
			String filePath = "D:/uploaded_contents";
			File file = new File(filePath);
			boolean exists = new File(filePath).exists();
			if (!exists) {
				new File(filePath).mkdirs();
			}
			PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(file + "/" + "Users" + ".pdf"));
			document.open();
			Font mainFont = FontFactory.getFont("Arial", 10, BaseColor.BLACK);

			Paragraph paragraph = new Paragraph("All User", mainFont);
			paragraph.setAlignment(Element.ALIGN_CENTER);
			paragraph.setIndentationLeft(50);
			paragraph.setIndentationRight(50);
			paragraph.setSpacingAfter(10);
			document.add(paragraph);

			PdfPTable table = new PdfPTable(4);// column amount
			table.setWidthPercentage(100);
			table.setSpacingBefore(10f);
			table.setSpacingAfter(10);

			Font tableHeader = FontFactory.getFont("Arial", 10, BaseColor.BLACK);
			Font tableBody = FontFactory.getFont("Arial", 9, BaseColor.BLACK);

			float[] columnWidths = { 2f, 2f, 2f, 2f };
			table.setWidths(columnWidths);
			/*
			 * Image img = Image.getInstance(filePath+"/Logo/Logo.png");
			 * img.setAbsolutePosition(450f, 10f); document.add(img);
			 */

			PdfPCell name = new PdfPCell(new Paragraph("name", tableHeader));
			name.setBorderColor(BaseColor.BLACK);
			name.setPaddingLeft(10);
			name.setHorizontalAlignment(Element.ALIGN_CENTER);
			name.setVerticalAlignment(Element.ALIGN_CENTER);
			name.setBackgroundColor(BaseColor.DARK_GRAY);
			name.setExtraParagraphSpace(5f);
			table.addCell(name);

			PdfPCell email = new PdfPCell(new Paragraph("email", tableHeader));
			email.setBorderColor(BaseColor.BLACK);
			email.setPaddingLeft(10);
			email.setHorizontalAlignment(Element.ALIGN_CENTER);
			email.setVerticalAlignment(Element.ALIGN_CENTER);
			email.setBackgroundColor(BaseColor.DARK_GRAY);
			email.setExtraParagraphSpace(5f);
			table.addCell(email);

			PdfPCell mobile = new PdfPCell(new Paragraph("mobile", tableHeader));
			mobile.setBorderColor(BaseColor.BLACK);
			mobile.setPaddingLeft(10);
			mobile.setHorizontalAlignment(Element.ALIGN_CENTER);
			mobile.setVerticalAlignment(Element.ALIGN_CENTER);
			mobile.setBackgroundColor(BaseColor.DARK_GRAY);
			mobile.setExtraParagraphSpace(5f);
			table.addCell(mobile);

			PdfPCell address = new PdfPCell(new Paragraph("address", tableHeader));
			address.setBorderColor(BaseColor.BLACK);
			address.setPaddingLeft(10);
			address.setHorizontalAlignment(Element.ALIGN_CENTER);
			address.setVerticalAlignment(Element.ALIGN_CENTER);
			address.setBackgroundColor(BaseColor.DARK_GRAY);
			address.setExtraParagraphSpace(5f);
			table.addCell(address);

			for (User User : Users) {
				PdfPCell nameValue = new PdfPCell(new Paragraph(User.getUserProfile().getFirstName(), tableHeader));
				nameValue.setBorderColor(BaseColor.BLACK);
				nameValue.setPaddingLeft(10);
				nameValue.setHorizontalAlignment(Element.ALIGN_CENTER);
				nameValue.setVerticalAlignment(Element.ALIGN_CENTER);
				nameValue.setBackgroundColor(BaseColor.WHITE);
				nameValue.setExtraParagraphSpace(5f);
				table.addCell(nameValue);

				PdfPCell emailValue = new PdfPCell(new Paragraph(User.getUserProfile().getEmail(), tableHeader));
				emailValue.setBorderColor(BaseColor.BLACK);
				emailValue.setPaddingLeft(10);
				emailValue.setHorizontalAlignment(Element.ALIGN_CENTER);
				emailValue.setVerticalAlignment(Element.ALIGN_CENTER);
				emailValue.setBackgroundColor(BaseColor.WHITE);
				emailValue.setExtraParagraphSpace(5f);
				table.addCell(emailValue);

				PdfPCell mobileValue = new PdfPCell(
						new Paragraph(String.valueOf(User.getUserProfile().getPhoneNumber())));
				mobileValue.setBorderColor(BaseColor.BLACK);
				mobileValue.setPaddingLeft(10);
				mobileValue.setHorizontalAlignment(Element.ALIGN_CENTER);
				mobileValue.setVerticalAlignment(Element.ALIGN_CENTER);
				mobileValue.setBackgroundColor(BaseColor.WHITE);
				mobileValue.setExtraParagraphSpace(5f);
				table.addCell(mobileValue);

				PdfPCell addressValue = new PdfPCell(
						new Paragraph(User.getUserProfile().getIdNumber().toString(), tableHeader));
				addressValue.setBorderColor(BaseColor.BLACK);
				addressValue.setPaddingLeft(10);
				addressValue.setHorizontalAlignment(Element.ALIGN_CENTER);
				addressValue.setVerticalAlignment(Element.ALIGN_CENTER);
				addressValue.setBackgroundColor(BaseColor.WHITE);
				addressValue.setExtraParagraphSpace(5f);
				table.addCell(addressValue);
			}

			document.add(table);

			document.close();
			writer.close();
			Path path = Paths.get(location, "Users.pdf");
			// InputStreamResource inputStreamResource = new InputStreamResource(new
			// FileInputStream(path.toFile()));
			// emailService.sendMail("samadhan563@gmail.com", "User details", "hello",
			// path.toFile());
			System.out.println("Pdf created");

			return true;

		} catch (Exception e) {
			return false;
		}
	}

	private void writeTableHeader(PdfPTable table) {

		PdfPCell cell = new PdfPCell();
		cell.setBackgroundColor(BaseColor.BLUE);
		cell.setPadding(5);

		Font font = FontFactory.getFont(FontFactory.HELVETICA);
		font.setColor(BaseColor.WHITE);
		font.setSize(8);

		cell.setPhrase(new Phrase("User ID", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("E-mail", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("Full Name", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("Roles", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("Phone", font));
		table.addCell(cell);
	}

	private void writeTableData(PdfPTable table, List<User> listUsers) {

		Font font = FontFactory.getFont(FontFactory.HELVETICA);
		font.setColor(BaseColor.BLACK);
		font.setSize(8);
		PdfPCell cell = new PdfPCell();
		for (User user : listUsers) {

			cell.setPhrase(new Phrase(String.valueOf(user.getId()), font));
			table.addCell(cell);

			cell.setPhrase(new Phrase(user.getUserProfile().getEmail(), font));
			table.addCell(cell);

			cell.setPhrase(
					new Phrase(user.getUserProfile().getFirstName() + " " + user.getUserProfile().getLastName(), font));
			table.addCell(cell);

			cell.setPhrase(new Phrase(user.getUserRole().toString(), font));
			table.addCell(cell);

			cell.setPhrase(new Phrase(String.valueOf(user.getUserProfile().getPhoneNumber()), font));
			table.addCell(cell);

		}
	}

	public void export(List<User> listUsers) throws DocumentException, IOException, MessagingException {
		Document document = new Document(PageSize.B6);
		String filePath = "D:/uploaded_contents/Users";
		File file = new File(filePath);
		boolean exists = new File(filePath).exists();
		if (!exists) {
			new File(filePath).mkdirs();
		}
		String fname = "booking_confirm_" + LocalDate.now().toString();
		PdfWriter.getInstance(document, new FileOutputStream(file + "/" + fname + ".pdf"));
		document.open();

		Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
		font.setSize(12);
		font.setColor(BaseColor.BLACK);

		Paragraph p = new Paragraph("Welcome To Rental System", font);
		p.setAlignment(Paragraph.ALIGN_LEFT);
		document.add(p);

		Font font1 = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
		font1.setSize(12);
		font1.setColor(BaseColor.GREEN);

		Paragraph p1 = new Paragraph("Invoice", font1);
		p1.setAlignment(Paragraph.ALIGN_RIGHT);
		document.add(p1);

		Font font2 = FontFactory.getFont(FontFactory.TIMES);
		font2.setSize(10);
		font2.setColor(BaseColor.BLACK);

		Paragraph p2 = new Paragraph("Date:" + LocalDate.now(), font2);
		p2.setAlignment(Paragraph.ALIGN_RIGHT);
		document.add(p2);

		Font font3 = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
		font3.setSize(12);
		font3.setColor(BaseColor.BLACK);

		Paragraph p3 = new Paragraph("Name :");
		Paragraph p4 = new Paragraph("Email Id :");
		Paragraph p6 = new Paragraph("Mobile no :");
		Paragraph p7 = new Paragraph("Address  :");
		// p3.setAlignment(Paragraph.ALIGN_CENTER);
		document.add(p3);

		Image img = Image.getInstance(filePath + "/Logo/Logo.png");
		img.setAbsolutePosition(450f, 10f);
		document.add(img);

		PdfPTable table = new PdfPTable(5);
		table.setWidthPercentage(100f);
		table.setWidths(new float[] { 1.1f, 3.5f, 3.0f, 2.0f, 1.5f });
		table.setSpacingBefore(10);

		writeTableHeader(table);
		writeTableData(table, listUsers);

		document.add(table);

		document.close();
		/*
		 * Path path = Paths.get((location+"/Users"),fname+".pdf");
		 * emailService.sendMail("samadhan563@gmail.com", "User details", "hello",
		 * path.toFile()); System.out.println("Pdf created");
		 */

	}

	public boolean createExcell(List<User> users) {

		String filePath = "D:/uploaded_contents/Users/report";
		File file = new File(filePath);
		boolean exists = new File(filePath).exists();
		if (!exists) {
			new File(filePath).mkdirs();
		}
		try {
			FileOutputStream outputStream = new FileOutputStream(file + "/" + "users.xls");
			HSSFWorkbook workbook = new HSSFWorkbook();
			HSSFSheet workSheet = workbook.createSheet("users");
			workSheet.setDefaultColumnWidth(30);

			HSSFCellStyle headerCellStyle = workbook.createCellStyle();
			// headerCellStyle.setFillBackgroundColor(HSSFColor.BLUE.index);
			// headerCellStyle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);

			HSSFRow headerRow = workSheet.createRow(0);

			HSSFCell serialNo = headerRow.createCell(0);
			serialNo.setCellValue("Serial_Number");
			serialNo.setCellStyle(headerCellStyle);

			HSSFCell userName = headerRow.createCell(1);
			userName.setCellValue("User_Name");
			userName.setCellStyle(headerCellStyle);

			HSSFCell firstName = headerRow.createCell(2);
			firstName.setCellValue("First_Name");
			firstName.setCellStyle(headerCellStyle);

			HSSFCell lastName = headerRow.createCell(3);
			lastName.setCellValue("Last_Name");
			lastName.setCellStyle(headerCellStyle);

			HSSFCell email = headerRow.createCell(4);
			email.setCellValue("Email_Id");
			email.setCellStyle(headerCellStyle);

			HSSFCell mobile = headerRow.createCell(5);
			mobile.setCellValue("Phone_Number");
			mobile.setCellStyle(headerCellStyle);

			HSSFCell aadharNumber = headerRow.createCell(6);
			aadharNumber.setCellValue("Aadhar_Number");
			aadharNumber.setCellStyle(headerCellStyle);

			HSSFCell dob = headerRow.createCell(7);
			dob.setCellValue("Date Of Birth");
			dob.setCellStyle(headerCellStyle);

			HSSFCell imageUrl = headerRow.createCell(8);
			imageUrl.setCellValue("Image_URL");
			imageUrl.setCellStyle(headerCellStyle);

			Integer i = 1;

			for (User user : users) {
				if (user.getUserRole() == UserRole.CUSTOMER) {
					HSSFRow bodyRow = workSheet.createRow(i);

					HSSFCellStyle bodyCellStyle = workbook.createCellStyle();
					// bodyCellStyle.setFillForegroundColor(HSSFColor.WHITE);

					HSSFCell serialNoValue = bodyRow.createCell(0);
					serialNoValue.setCellValue(i);
					serialNoValue.setCellStyle(bodyCellStyle);

					HSSFCell nameValue = bodyRow.createCell(1);
					nameValue.setCellValue(user.getUserName());
					nameValue.setCellStyle(bodyCellStyle);

					HSSFCell firstNameValue = bodyRow.createCell(2);
					firstNameValue.setCellValue(user.getUserProfile().getFirstName());
					firstNameValue.setCellStyle(bodyCellStyle);

					HSSFCell lastNameValue = bodyRow.createCell(3);
					lastNameValue.setCellValue(user.getUserProfile().getLastName());
					lastNameValue.setCellStyle(bodyCellStyle);

					HSSFCell emailValue = bodyRow.createCell(4);
					emailValue.setCellValue(user.getUserProfile().getEmail());
					emailValue.setCellStyle(bodyCellStyle);

					HSSFCell mobileValue = bodyRow.createCell(5);
					mobileValue.setCellValue(user.getUserProfile().getPhoneNumber());
					mobileValue.setCellStyle(bodyCellStyle);

					HSSFCell aadharNumberValue = bodyRow.createCell(6);
					aadharNumberValue.setCellValue(user.getUserProfile().getIdNumber());
					aadharNumberValue.setCellStyle(bodyCellStyle);

					HSSFCell dobValue = bodyRow.createCell(7);
					dobValue.setCellValue(user.getUserProfile().getDateOfBirth().toString());
					dobValue.setCellStyle(bodyCellStyle);

					HSSFCell imageUrlValue = bodyRow.createCell(8);
					imageUrlValue.setCellValue(user.getUserProfile().getProfileImage());
					imageUrlValue.setCellStyle(bodyCellStyle);

					i++;
				}
			}

			workbook.write(outputStream);
			outputStream.flush();
			outputStream.close();
			return true;

		} catch (Exception e) {
			return false;
		}
	}

	public void invoiceBill(int orderId)
			throws MalformedURLException, IOException, DocumentException, MessagingException {

		Optional<RentBooking> optionalRentBooking = bookingRepository.findById(orderId);
		RentBooking rentBooking = optionalRentBooking
				.orElseThrow(() -> new UserException("Booking is not found with id " + orderId));
		List<BookingDetail> bookingDetails = rentBooking.getBookingDetails();
		User user = rentBooking.getUser();
		UserAddress userAddress = addressRepository.findByUserProfile(user.getUserProfile()).get();

		Document document = new Document(PageSize.B6);
		String filePath = "D:/uploaded_contents/bills";
		File file = new File(filePath);
		boolean exists = new File(filePath).exists();
		if (!exists) {
			new File(filePath).mkdirs();
		}
		String fname = "booking_confirm_" + rentBooking.getId() + "_" + user.getUserName() + "_"
				+ LocalDate.now().toString();
		PdfWriter.getInstance(document, new FileOutputStream(file + "/" + fname + ".pdf"));
		document.open();

		writeInvoiceDocumentHeader(rentBooking, user, document, userAddress);

		PdfPTable table = new PdfPTable(5);
		table.setWidthPercentage(100f);
		table.setWidths(new float[] { 0.9f, 4.9f, 1.0f, 1.2f, 1.5f });
		table.setSpacingBefore(10);

		writeInvoiceTableHeader(table);
		writeInvoiceTableData(table, bookingDetails);
		document.add(table);

		PdfPTable table1 = new PdfPTable(5);
		table1.setWidthPercentage(100f);
		table1.setWidths(new float[] { 0.9f, 4.9f, 1.0f, 1.2f, 1.5f });

		writeInvoiceTableDataLast(table1, rentBooking);
		document.add(table1);
		

		writeInvoiceDocumentFooter(document,rentBooking);
		document.close();
/*
		Path path = Paths.get((filePath), fname + ".pdf");
		emailService.sendMail(user.getUserProfile().getEmail(), "Rental System bill invoce", "Hi "
				+ user.getUserProfile().getFirstName() + ", \n\tThis is your booking bill. \n! Thanks Visit Again ! ",
				path.toFile());
		System.out.println("Pdf created and sent ");
*/
	}

	private void writeInvoiceDocumentHeader(RentBooking rentBooking, User user, Document document,
			UserAddress userAddress) throws MalformedURLException, IOException, DocumentException {
		Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
		font.setSize(12);
		font.setColor(BaseColor.BLACK);

		// adding logo and name at heading
		Image img = Image.getInstance("D:/uploaded_contents/Users/Logo/Logo.png");
		img.scaleAbsolute(30, 35);
		img.setAlignment(20);
		img.setAbsolutePosition(20, 50);
		Phrase phrase = new Phrase();

		phrase.add(new Chunk(img, 0, 0).setHorizontalScaling(20));
		Paragraph pLogo = new Paragraph(phrase);
		pLogo.setAlignment(Paragraph.ALIGN_LEFT);
		pLogo.add(Chunk.TABBING);
		pLogo.add(Chunk.TABBING);
		pLogo.add(new Chunk("Welcome To Rental System	", font).setUnderline(0, 0));
		document.add(pLogo);

		font.setColor(BaseColor.CYAN);
		Paragraph p1 = new Paragraph("Invoice", (font));
		p1.setAlignment(Paragraph.ALIGN_RIGHT);
		document.add(p1);

		Font font2 = FontFactory.getFont(FontFactory.TIMES);
		font2.setSize(8);
		font2.setColor(BaseColor.BLACK);

		Paragraph p2 = new Paragraph("Date:" + LocalDate.now(), font2);
		p2.setAlignment(Paragraph.ALIGN_RIGHT);
		document.add(p2);

		Font font3 = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
		font3.setSize(12);
		font3.setColor(BaseColor.BLACK);

		Font font4 = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
		font4.setSize(8);

		Paragraph p3 = new Paragraph("Name 	       :", font4);
		p3.add(user.getUserProfile().getFirstName() + " " + user.getUserProfile().getLastName());
		p3.add(Chunk.TABBING);
		p3.add(Chunk.TABBING);
		p3.add(new Chunk("Rental date :", font4));
		p3.add(rentBooking.getRentDate().toString());
		document.add(p3);

		Paragraph p4 = new Paragraph("EmailId     :", font4);
		p4.add(user.getUserProfile().getEmail());
		p4.add(Chunk.TABBING);
		p4.add(Chunk.TABBING);
		p4.add(new Chunk("Rental days :", font4));
		p4.add(String.valueOf(1));
		document.add(p4);

		Paragraph p5 = new Paragraph("Mobile no :", font4);
		p5.add(String.valueOf(user.getUserProfile().getPhoneNumber()));
		p5.add(Chunk.TABBING);
		p5.add(Chunk.TABBING);
		p5.add(Chunk.TABBING);
		p5.add(new Chunk("Security Deposit :", font4));
		p5.add(String.valueOf(rentBooking.getSecurityDeposit()));
		document.add(p5);

		Paragraph p6 = new Paragraph("Address   :", font4);
		p6.add(userAddress.toString());	
		document.add(p6);

	}

	private void writeInvoiceDocumentFooter(Document document, RentBooking rentBooking) throws DocumentException {
		Font font4 = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
		font4.setSize(8);

		String numberToWord = NumberUtlity
				.NumberToWord(String.valueOf(Math.abs(bookingDetailRepository.getSumOfRentTotalAmount(rentBooking))));
		Paragraph p7 = new Paragraph("Amount in Word : ", font4);
		p7.add(new Chunk(numberToWord, font4).setUnderline(0, 0));
		p7.setSpacingAfter(3);
		document.add(p7);
		
		Payment payment = paymentRepository.findByRentBooking(rentBooking).get();
		Paragraph p12 = new Paragraph(new Chunk("Payment Details:", font4).setUnderline(0, 0));
		p12.add(new Chunk((payment.getPaymentGatway()==PaymentGatway.CASH_ON_DELIVERY)?" Pay On Pickup(please pay the amount on pickup). ":" Your payment recived by card.", font4));
		p12.setSpacingAfter(40);
		document.add(p12);

		Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
		font.setSize(12);
		font.setColor(BaseColor.CYAN);

		Paragraph p8 = new Paragraph("! Thanks Visit Again ! ", font);
		p8.setAlignment(Paragraph.ALIGN_CENTER);
		document.add(p8);

		Font font5 = FontFactory.getFont(FontFactory.TIMES_ITALIC);
		font5.setSize(8);

		Paragraph p9 = new Paragraph(new Chunk("S.N.Gaikwad", font5).setUnderline(0, 0));
		p9.setAlignment(Paragraph.ALIGN_RIGHT);
		document.add(p9);

		Paragraph p10 = new Paragraph(new Chunk("Authority", font4).setUnderline(0, 0));
		p10.setAlignment(Paragraph.ALIGN_RIGHT);
		document.add(p10);

		font4.setSize(7);
		Paragraph p11 = new Paragraph("( Samadhan Gaikwad )", font4);
		p11.setAlignment(Paragraph.ALIGN_RIGHT);
		document.add(p11);
	}

	private void writeInvoiceTableHeader(PdfPTable table) {

		PdfPCell cell = new PdfPCell();
		cell.setBackgroundColor(BaseColor.WHITE);
		cell.setPadding(5);

		Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
		font.setColor(BaseColor.BLACK);
		font.setSize(7);

		cell.setPhrase(new Phrase("SrNo.", font));
		cell.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
		table.addCell(cell);

		cell.setPhrase(new Phrase("Description ", font));
		cell.setHorizontalAlignment(Paragraph.ALIGN_LEFT);
		table.addCell(cell);

		cell.setPhrase(new Phrase("Qty.", font));
		cell.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
		table.addCell(cell);

		cell.setPhrase(new Phrase("Rate", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("Amount", font));
		cell.setHorizontalAlignment(Paragraph.ALIGN_RIGHT);
		table.addCell(cell);
	}

	private void writeInvoiceTableData(PdfPTable table, List<BookingDetail> bookingDetails) {

		Font font = FontFactory.getFont(FontFactory.HELVETICA);
		font.setColor(BaseColor.BLACK);
		font.setSize(7);
		PdfPCell cell = new PdfPCell();
		int count = 0;
		for (BookingDetail bookingDetail : bookingDetails) {

			cell.setPhrase(new Phrase(String.valueOf(++count), font));
			cell.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
			table.addCell(cell);

			cell.setPhrase(new Phrase(bookingDetail.getEquipementName(), font));
			cell.setHorizontalAlignment(Paragraph.ALIGN_LEFT);
			table.addCell(cell);

			cell.setPhrase(new Phrase(String.valueOf(bookingDetail.getQuantity()), font));
			cell.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
			table.addCell(cell);

			cell.setPhrase(new Phrase(String.valueOf(bookingDetail.getRentPerDay()), font));
			table.addCell(cell);

			cell.setPhrase(new Phrase(String.valueOf(String.valueOf(bookingDetail.getRentPerDay())), font));
			cell.setHorizontalAlignment(Paragraph.ALIGN_RIGHT);
			table.addCell(cell);
		}
	}

	private void writeInvoiceTableDataLast(PdfPTable table, RentBooking rentBooking) {

		Font font = FontFactory.getFont(FontFactory.HELVETICA);
		font.setColor(BaseColor.BLACK);
		font.setSize(7);

		PdfPCell cell = new PdfPCell();
		cell.setHorizontalAlignment(Paragraph.ALIGN_RIGHT);

		cell.setColspan(4);
		cell.setPhrase(new Phrase("Qty.", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase(String.valueOf(bookingDetailRepository.getSumOfQuantity(rentBooking)), font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("Amount", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase(String.valueOf(bookingDetailRepository.getSumOfRentAmount(rentBooking)), font));
		table.addCell(cell);

		cell.setPhrase(new Phrase("Saving amount", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase(String.valueOf(Math.abs(bookingDetailRepository.getSumOfRentTotalAmount(rentBooking)
				- bookingDetailRepository.getSumOfRentAmount(rentBooking))), font));
		table.addCell(cell);

		Font taFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
		taFont.setColor(BaseColor.BLACK);
		taFont.setSize(7);

		cell.setPhrase(new Phrase("Total amount", taFont));
		table.addCell(cell);

		cell.setPhrase(
				new Phrase(String.valueOf(bookingDetailRepository.getSumOfRentTotalAmount(rentBooking)), taFont));
		table.addCell(cell);

	}

}