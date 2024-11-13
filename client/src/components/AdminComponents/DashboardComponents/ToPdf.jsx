import React, { useContext } from 'react'
import { RankContext } from '../../../../context/rankContext';
import { MdFileDownload } from "react-icons/md";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import logo from '../../../assets/images/logo.png'

const ToPdf = ({ totalRank, approvedFaculty }) => {
    const { ranks } = useContext(RankContext);
    const generatePDF = () => {
        const doc = new jsPDF();
    
        const logoWidth = 60;
        const logoHeight = 15; 
        const pageWidth = doc.internal.pageSize.width;
        
        doc.addImage(logo, 'PNG', (pageWidth - logoWidth) / 2, 10, logoWidth, logoHeight); 
    
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        let yPosition = 10 + logoHeight + 10; 
        let pageCount = 1; 

        const addFooter = () => {
            const footerText = `Page ${pageCount}`;
            doc.setFontSize(10);
            doc.text(footerText, pageWidth - 30, doc.internal.pageSize.height - 10, { align: "right" });
        };
    
        doc.text('Rank Count:', 15, yPosition);
        yPosition += 10; 
        
        const tableData = ranks.map(rank => {
            const count = totalRank[rank.rankName] || 0;
            return [rank.rankName, count];
        });
    
        doc.autoTable({
            head: [['Rank Name', 'Count']],
            body: tableData.map(row => [row[0], row[1]]),
            startY: yPosition,
            margin: { top: 10 },
            theme: 'striped',
        });

        addFooter();
        pageCount++;
    
        doc.addPage();
        yPosition = 10;
    
        doc.text('Promoted Faculty:', 15, yPosition);
        yPosition += 10; 
        const approvedFacultyData = approvedFaculty.map(data => {
            return { name: data.name, newRank: data.applyingFor };
        });
    
        doc.autoTable({
            head: [['Name', 'New Rank']],
            body: approvedFacultyData.map(row => [row.name, row.newRank]),
            startY: yPosition,
            margin: { top: 10 },
            theme: 'striped',
        });

        addFooter();

        doc.save('ranking_data.pdf');
      };

    return (
        <div className='my-auto'>
            <button onClick={generatePDF} className='flex justify-center py-[7px] w-44 text-xs bg-NuButton text-white rounded-md shadow-md duration-300 hover:bg-NuButtonHover hover:scale-105'>
                <span className="my-auto">Ranking Data</span>
                <MdFileDownload className='my-auto text-xl ml-2'/>
            </button>

            <div  className='hidden'>
                {ranks.map(rank => {
                    const count = totalRank[rank.rankName] || 0

                    return ( 
                        <div key={rank._id}>
                            <p>{rank.rankName}</p>
                            <p>{count}</p>
                        </div>
                    )
                })}
            </div>
       </div>
    )
}

export default ToPdf
