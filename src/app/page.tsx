'use client'
import Image from 'next/image'
import './table.carbon.scss';
import styles from './page.module.css'
import { DataTable, Table as TableCarbon,  TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from '@carbon/react';
import { headerData, rowData, headerDataBig, rowDataBig, getRowData, getHeatmapColor } from '../../data';
import { ChangeEvent, useState, useMemo } from 'react';
import { debug } from 'console';

const finalRows = getRowData();

export default function Home() {

  const [showFirst, setShowFirst] = useState('project');
  const [isRuleHidden, setIsRuleHidden] = useState(false);


  function handleChangeShowFirst(e: ChangeEvent<HTMLInputElement>) {
    setShowFirst(e.target.value);
  }

  function handleHideRule(e: ChangeEvent<HTMLInputElement>) {
    setIsRuleHidden(e.target.checked);
  }

  const finalHeaders = useMemo(() => getFinalHeaders(showFirst, isRuleHidden), [showFirst, isRuleHidden]);


  return (
    <main className={styles.main}>
     <h1>Table - Extended</h1>


     <ShowFirstFilter selected={showFirst} handleChangeShowFirst={handleChangeShowFirst} />

     



      <div style={{margin: '15px 0'}}>
        <input onChange={(e) => handleHideRule(e)} type="checkbox" id="hideRule" name="hideRule"/>
        <label htmlFor='hideRule'>{' '}Hide ID Column</label>
      </div>

      


    <div className="table-container">
        <DataTable
          isSortable={true}
          rows={rowDataBig}
          headers={finalHeaders}
        >
          {({ rows, headers, getHeaderProps, getTableProps }) => {
            return (
              <TableContainer
                title={'Results'}
                tabIndex={0}
                className='tabela'
              >
                <TableCarbon
                  {...getTableProps()}
                  size="lg"
                  className={styles.table}
                >
                  <TableHead>
                    <TableRow>
                      {headers.map((header, key) => {
                        return (
                          //@ts-ignore
                          <TableHeader
                            {...getHeaderProps({
                              header,
                              isSortable: true
                            })}
                            key={key}
                            className={styles.tableHeader}
                          >
                            {header.header}
                          </TableHeader>
                        );
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => {
                      return (
                        <TableRow
                          key={row.id}
                          // className={clsx(
                          //   styles.tableRow,
                          //   onRowClick && styles.tableRowClickable
                          // )}
                          tabIndex={0}
                          //onMouseOver={() => handleRowHover(row.id)}
                          // onFocus={
                          //   isArchivable
                          //     ? () => handleRowHover(row.id)
                          //     : undefined
                          // }
                          // onClick={onRowClick && handleRowClick}
                          // onKeyDown={onRowClick && handleEnterOrSpaceKeydown}
                        >
                          {row.cells.map((cell) => {
                            const cellValue = Number(cell.value);
                            return (
                              <TableCell key={cell.id} style={{background: getHeatmapColor({score: cellValue})}}>{cell.value}</TableCell>
                            )
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </TableCarbon>
              </TableContainer>
            );
          }}
        </DataTable>
      </div>
    </main>
  )
}


function getFinalHeaders(showFirst: string, isRuleColumnHidden: boolean) {

  let finalHeaders = [];

  if (showFirst === 'name') {
    finalHeaders = [...headerDataBig];
  } else {
    finalHeaders = swapElements(headerDataBig, 0, 5);
  }

  if (isRuleColumnHidden) {
    finalHeaders.splice(1, 1);
  }

  return finalHeaders;
}

function swapElements (array: any[], index1: number, index2: number) {
  const newArr = [...array];
  const temp = newArr[index1];
  newArr[index1] = newArr[index2];
  newArr[index2] = temp;

  return newArr;
};


function ShowFirstFilter({handleChangeShowFirst, selected = "project"} : {handleChangeShowFirst: (e: ChangeEvent<HTMLInputElement>) => void, selected: string}) {
  
  return (
    <fieldset>
      <legend>Show first:</legend>

      <div>
        <input onChange={(e) => handleChangeShowFirst(e)} type="radio" id="projectFirst" value="project" checked={selected === 'project'} />
        <label htmlFor="statusFirst">Show project first</label>
      </div>

      <div>
        <input onChange={(e) => handleChangeShowFirst(e)} type="radio" id="nameFirst" value="name" checked={selected === 'name'} />
        <label htmlFor="nameFirst">Show name first</label>
      </div>

      
    </fieldset>
  )
}