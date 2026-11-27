export default function PrintStyles() {
    return (
        <style>{`
            @page {
                size: A3 landscape;
                margin: 10mm;
            }

            @media print {
                body *:not(:has(#forPrint)):not(#forPrint):not(#forPrint *) {
                    display: none !important;
                }

                html, body, *:has(#forPrint):not(#forPrint) {
                    margin: 0 !important;
                    padding: 0 !important;
                    min-height: 0 !important;
                    height: auto !important;
                    background: #fff !important;
                }

                #forPrint {
                    width: 100% !important;
                    max-width: none !important;
                    margin: 0 !important;
                    break-inside: avoid;
                }
                #forPrint .overflow-x-auto {
                    overflow: visible !important;
                }
                #forPrint table {
                    min-width: 0 !important;
                    width: 100% !important;
                }

                #forPrint, #forPrint * {
                    color: #000 !important;
                    background: #fff !important;
                    border-color: #000 !important;
                }
            }
        `}</style>
    );
}