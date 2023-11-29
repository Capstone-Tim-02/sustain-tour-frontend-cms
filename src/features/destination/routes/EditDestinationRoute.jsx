import { Link, useParams } from "react-router-dom"

import { Breadcrumb } from "@/components/Elements"
import { ContentLayout } from "@/components/Layouts"

import { EditDestination} from "../components/EditDestinations"

export const EditDestinationRoute =  () => {
    const {id} = useParams();
    return (
        <>
            <ContentLayout title='Edit Destinasi'>
                <div className="justify-between sm:flex">
                    <Breadcrumb>
                        <Link to='/destinasi'>
                            <span className="px-2 text-sm font-semibold text-primary-100">Destinasi</span>
                        </Link>
                        <span className="px-2 text-sm font-semibold text-primary-100">Edit Destinasi</span>
                    </Breadcrumb>
                </div>

                <div className="mt-6">
                    <div className="mb-8 flex items-center justify-between">
                        <div className="sm:flex-auto">
                            <h1 className="text-xl font-semibold text-gray-900 sm:text-3xl">Edit Destinasi</h1>
                        </div>
                    </div>
                </div>
                <EditDestination id={id}/>

            </ContentLayout>
        </>
    )
}