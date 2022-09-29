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
public class BillPdfService {

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

		writeInvoiceDocumentFooter(document, rentBooking);
		document.close();

		String payStatus = "";
		if (paymentRepository.findByRentBooking(rentBooking).get().getPaymentGatway() == PaymentGatway.CASH_ON_DELIVERY)
			payStatus = "Please Pay On Pickup(please pay the amount on pickup). ";
		Path path = Paths.get((filePath), fname + ".pdf");
		emailService.sendMail(user.getUserProfile().getEmail(), "Rental System Bill Invoce", "Hi "
				+ user.getUserProfile().getFirstName()
				+ ", \n\tWe are contacting you in regard to a new invoice of booking that has been created on your account. You may find the invoice attached. "
				+ payStatus + " \n! Thanks Visit Again ! ", path.toFile());
		System.out.println("Pdf created and sent ");

	}

	private void writeInvoiceDocumentHeader(RentBooking rentBooking, User user, Document document,
			UserAddress userAddress) throws MalformedURLException, IOException, DocumentException {
		Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
		font.setSize(12);
		font.setColor(BaseColor.BLACK);

		// adding logo and name at heading
		Image img = Image.getInstance("D:/uploaded_contents/logo/logo.png");
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
		font.setSize(10);
		Paragraph p1 = new Paragraph("Invoice No : RSYS-I0" + rentBooking.getId(), (font));
		p1.setAlignment(Paragraph.ALIGN_RIGHT);
		document.add(p1);
		font.setSize(12);

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

		String numberToWord = NumberUtlity.NumberToWord(String.valueOf(
				Math.abs(bookingDetailRepository.getSumOfRentTotalAmount(rentBooking) * rentBooking.getRentDay())));
		Paragraph p7 = new Paragraph("Amount in Word : ", font4);
		p7.add(new Chunk(numberToWord, font4).setUnderline(0, 0));
		p7.setSpacingAfter(3);
		document.add(p7);

		Payment payment = paymentRepository.findByRentBooking(rentBooking).get();
		Paragraph p12 = new Paragraph(new Chunk("Payment Details:", font4).setUnderline(0, 0));
		p12.add(new Chunk((payment.getPaymentGatway() == PaymentGatway.CASH_ON_DELIVERY)
				? " Pay On Pickup(please pay the amount on pickup). "
				: " Your payment recived by card.", font4));
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

		Paragraph p9 = new Paragraph(new Chunk("rsys...", font5).setUnderline(0, 0));
		p9.setAlignment(Paragraph.ALIGN_RIGHT);
		document.add(p9);

		Paragraph p10 = new Paragraph(new Chunk("Authority", font4).setUnderline(0, 0));
		p10.setAlignment(Paragraph.ALIGN_RIGHT);
		document.add(p10);

		font4.setSize(7);
		Paragraph p11 = new Paragraph("( Rental System )", font4);
		p11.setAlignment(Paragraph.ALIGN_RIGHT);
		document.add(p11);
		Paragraph p13 = new Paragraph("+(91) 9999922222", font4);
		p13.setAlignment(Paragraph.ALIGN_RIGHT);
		document.add(p13);
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

		cell.setPhrase(new Phrase("Rent Days(" + rentBooking.getRentDay() + ") * Amount ("
				+ bookingDetailRepository.getSumOfRentAmount(rentBooking) + ")", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase(
				String.valueOf(bookingDetailRepository.getSumOfRentAmount(rentBooking) * rentBooking.getRentDay()),
				font));
		table.addCell(cell);

		double sA = (bookingDetailRepository.getSumOfRentTotalAmount(rentBooking)
				- bookingDetailRepository.getSumOfRentAmount(rentBooking));
		cell.setPhrase(
				new Phrase("Rent Days(" + rentBooking.getRentDay() + ") *Saving amount (" + Math.abs(sA) + ")", font));
		table.addCell(cell);

		cell.setPhrase(new Phrase(String.valueOf(Math.abs(sA) * rentBooking.getRentDay()), font));
		table.addCell(cell);

		Font taFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
		taFont.setColor(BaseColor.BLACK);
		taFont.setSize(7);

		cell.setPhrase(new Phrase("Rent Days(" + rentBooking.getRentDay() + ") *Total amount ("
				+ bookingDetailRepository.getSumOfRentTotalAmount(rentBooking) + ")", taFont));
		table.addCell(cell);

		cell.setPhrase(new Phrase(
				String.valueOf(bookingDetailRepository.getSumOfRentTotalAmount(rentBooking) * rentBooking.getRentDay()),
				taFont));
		table.addCell(cell);

	}

}