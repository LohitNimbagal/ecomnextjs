import React, { useState } from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationEnd,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationStart,
} from "@/components/ui/pagination"

interface Category {
    id: number;
    name: string;
    _id: string;
    // Add other properties if present
  }
  
  interface ResponseData {
    message: string;
    totalPages: number;
    categories: Category[];
    // Add other properties if present
  }

interface Props {
    pageNumber: number;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
    data: ResponseData;
  }

export const PaginationSection: React.FC<Props> = ({pageNumber, setPageNumber, data}) => {

    // const {pageNumber, setPageNumber, data} = props

    const handelPrePage = () => {
        if (pageNumber > 1) {
            setPageNumber(prev => prev - 1)
        }
    }

    const handelNextPage = () => {
        if (pageNumber < data.totalPages) {
            setPageNumber(prev => prev + 1)
        }
    }

    return (
        <Pagination>
            <PaginationContent>

                <PaginationItem>
                    <PaginationStart onClick={() => setPageNumber(1)} />
                </PaginationItem>

                <PaginationItem>
                    <PaginationPrevious onClick={handelPrePage} />
                </PaginationItem>

                {pageNumber !== 1 &&
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                }

                {pageNumber === 1 ?
                    null
                    :
                    <PaginationItem>
                        <PaginationLink>{pageNumber - 1}</PaginationLink>
                    </PaginationItem>
                }

                <PaginationItem>
                    <PaginationLink isActive>
                        {pageNumber}
                    </PaginationLink>
                </PaginationItem>

                {pageNumber < data?.totalPages &&
                    <PaginationItem>
                        <PaginationLink>{pageNumber + 1}</PaginationLink>
                    </PaginationItem>
                }

                {pageNumber !== data?.totalPages &&
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                }

                <PaginationItem>
                    <PaginationNext onClick={handelNextPage} />
                </PaginationItem>

                <PaginationItem>
                    <PaginationEnd onClick={() => setPageNumber(data?.totalPages)} />
                </PaginationItem>

            </PaginationContent>
        </Pagination>
    )
}
