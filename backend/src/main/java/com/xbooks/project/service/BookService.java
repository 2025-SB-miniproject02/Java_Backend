// package com.xbooks.project.service;

// import java.util.List;

// import org.springframework.stereotype.Service;

// import com.xbooks.project.dto.BookDTO;
// import com.xbooks.project.model.Book;
// import com.xbooks.project.repository.BookRepository;

// import lombok.RequiredArgsConstructor;
// import lombok.extern.slf4j.Slf4j;

// @RequiredArgsConstructor
// @Service
// @Slf4j
// public class BookService {
//     private final BookRepository bookRepository;

//     public BookDTO convertToDTO(Book book) {
//         return BookDTO.builder()
//             .book_id(book.getBook_id())
//             .book_seller(book.getBook_seller())
//             .book_title(book.getBook_title())
//             .book_author(book.getBook_author())
//             .book_publisher(book.getBook_publisher())
//             .book_date(book.getBook_date())
//             .book_category_id(book.getBook_category_id())
//             .book_image(book.getBook_image())
//             .book_condition(book.getBook_condition())
//             .book_description(book.getBook_description())
//             .book_price(book.getBook_price())
//             .book_status(book.getBook_status())
//             .book_original_price(book.getBook_original_price())
//             .book_translator(book.getBook_translator())
//             .book_binding(book.getBook_binding())
//             .book_pages(book.getBook_pages())
//             .book_weight(book.getBook_weight())
//             .book_height(book.getBook_height())
//             .book_created(book.getBook_created())
//             .book_updated(book.getBook_updated())
//             .book_solded(book.getBook_solded())
//             .book_predicted(book.getBook_predicted())
//             .build();
//     }
    
//     public Book convertToEntity(BookDTO dto) {
//         Book book = new Book();
//         book.setBook_id(dto.getBook_id());
//         book.setBook_seller(dto.getBook_seller());
//         book.setBook_title(dto.getBook_title());
//         book.setBook_author(dto.getBook_author());
//         book.setBook_publisher(dto.getBook_publisher());
//         book.setBook_date(dto.getBook_date());
//         book.setBook_category_id(dto.getBook_category_id());
//         book.setBook_image(dto.getBook_image());
//         book.setBook_condition(dto.getBook_condition());
//         book.setBook_description(dto.getBook_description());
//         book.setBook_price(dto.getBook_price());
//         book.setBook_status(dto.getBook_status());
//         book.setBook_original_price(dto.getBook_original_price());
//         book.setBook_translator(dto.getBook_translator());
//         book.setBook_binding(dto.getBook_binding());
//         book.setBook_pages(dto.getBook_pages());
//         book.setBook_weight(dto.getBook_weight());
//         book.setBook_height(dto.getBook_height());
//         book.setBook_created(dto.getBook_created());
//         book.setBook_updated(dto.getBook_updated());
//         book.setBook_solded(dto.getBook_solded());
//         book.setBook_predicted(dto.getBook_predicted());
//         return book;
//     }
    
//     // public List<BookDTO> getBookList(){
//     //     return this.bookRepository.findAll()
//     //                 .stream()
//     //                 .map(this::convertToDTO)
//     //                 .collect(Collectors.toList());
//     // }
    
//     public List<Book> getBookList(){
//         return this.bookRepository.findAll();
//     }
// }
