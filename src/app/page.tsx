'use client'
import Image from 'next/image'
import './table.carbon.scss';
import styles from './page.module.css'
import { DataTable, Table as TableCarbon,  TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from '@carbon/react';
import { headerData, rowData, headerDataBig, rowDataBig, getRowData } from '../../data';
import { ChangeEvent, useState, useMemo } from 'react';


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

  const finalRows = useMemo(() => getRowData(), [])

  debugger


  return (
    <main className={styles.main}>
     <h1>Table - Extended</h1>


      <fieldset>
        <legend>Show first:</legend>

        <div>
          <input onChange={(e) => handleChangeShowFirst(e)} type="radio" id="projectFirst" name="showFirst" value="project" {...(showFirst === 'project' && {checked: true})} />
          <label htmlFor="statusFirst">Show project first</label>
        </div>

        <div>
          <input onChange={(e) => handleChangeShowFirst(e)} type="radio" id="nameFirst" name="showFirst" value="name" {...(showFirst === 'name' && {checked: true})} />
          <label htmlFor="nameFirst">Show name first</label>
        </div>

        
      </fieldset>



      <div style={{margin: '15px 0'}}>
        <input onChange={(e) => handleHideRule(e)} type="checkbox" id="hideRule" name="hideRule"/>
        <label htmlFor='hideRule'>{' '}Hide ID Column</label>
      </div>

      


    <div className="table-container">
        <DataTable
          isSortable={true}
          rows={finalRows}
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
                          {row.cells.map((cell) => (
                            <TableCell key={cell.id}>{cell.value}</TableCell>
                          ))}
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
