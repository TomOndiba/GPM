chcp 65001
"C:\Program Files (x86)\CoolUtils\PDF Combine Pro\PDFCombinePro.exe" "\\SRVDC\DONNEES\job\%1\%2\Rapports Finals\report_%3.xlsx" "\\SRVDC\DONNEES\job\%1\%2\Annexe PDF\%3" "\\SRVDC\DONNEES\job\%1\%2\Rapports Finals\Report_%3.pdf" -kfs -c PDF -pdflimit 0 -HeadText "Pages [Page Counter] of [Total Pages]" -HeadAlign r -HeadFont "Arial" -HeadSize 6 -FootAlign c -FootFont Tahoma -FootSize 10 -bookmark -npr 0,0 -bstyle f -bpdf -PDFAuthor MRSAS -PDFSubject Annexe_%1 -PDFProducer Softplicity -toclinestyle D -toclinecolor silver -tocfont [Calibri,11,black] -tocmargins [0.80,0.80,0.80,0.80] -pc M -TM 0.3 -LM 0.3 -BM 0.3 -RM 0.3 -ps A4
