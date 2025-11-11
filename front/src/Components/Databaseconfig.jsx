import React from 'react'
import Nav from './Nav'
import { Plus, Database, Code, ChartArea } from 'lucide-react'

function Databaseconfig() {
    return (
        <>
            <Nav />
            <div className='px-5 py-20'>
                <div className='flex w-full mx-auto h-auto min-h-screen'>

                    <div className='w-full'>
                        <div className='flex justify-center items-center'>
                            <div className='w-full max-w-5xl'>
                                <h1 className='text-black text-center mb-9 font-medium text-[35px]'>Ready to explore your data?</h1>
                                <form className='w-full border-black border rounded-[15px] overflow-x-auto'>

                                    {/* Top Section */}
                                    <div className='border-b-2 border-black p-[17px] flex flex-wrap md:flex-nowrap items-center justify-between gap-4'>
                                        <div className='flex items-center gap-3 w-full md:w-auto'>
                                            <label htmlFor="Database">Write a query in plain English:</label>
                                        </div>

                                        <div className='flex flex-wrap md:flex-nowrap gap-4 items-center w-full md:w-auto'>
                                            <h1 className='flex items-center cursor-pointer gap-2 border border-black px-4 py-2 rounded-[7px] text-center w-full md:w-auto justify-center'>
                                                <Database size={20} />Demo Database (MYsql)
                                            </h1>
                                            <button className='px-4 py-2 rounded-[7px] flex items-center gap-4 cursor-pointer bg-gray-900 text-white border-1 w-full md:w-auto justify-center'>
                                                <Plus size={20} className='text-white' /> your database
                                            </button>
                                        </div>
                                    </div>

                                    {/* Textarea */}
                                    <div className='px-[14px] py-2 flex justify-start'>
                                        <textarea
                                            type="text"
                                            placeholder='List all the products that have been order more than 10 times'
                                            className='w-full h-auto focus:outline-none border-white resize-none'
                                            rows={7}
                                        />
                                    </div>
                                </form>

                                {/* Result Section */}
                                <div className='bg-lime-50 rounded-[15px] border-1 mt-5 w-full overflow-x-auto'>
                                    <div className='border-b-1 border-black p-[17px] flex flex-wrap md:flex-nowrap items-center justify-between gap-4'>
                                        <div className='flex items-center gap-3'>
                                            <label htmlFor="Database">Result :  </label>
                                        </div>

                                        <div className='flex flex-wrap md:flex-nowrap gap-4 items-center justify-center w-full md:w-auto'>
                                            <h1 className='flex items-center cursor-pointer gap-2 border border-black px-4 py-2 rounded-[7px] justify-center w-full md:w-auto'>
                                                <Code size={20} className='text-black' />SQL
                                            </h1>

                                            <button className='px-4 py-2 rounded-[7px] flex items-center gap-1 cursor-pointer text-black border-1 justify-center w-full md:w-auto'>
                                                <ChartArea size={20} className='text-black' />Graph
                                            </button>

                                            <button className='px-4 py-2 rounded-[7px] flex items-center gap-1 cursor-pointer bg-gray-900 text-white border-1 justify-center w-full md:w-auto'>
                                                <Plus size={20} className='text-white' />Copy
                                            </button>
                                        </div>
                                    </div>

                                    <div className='overflow-x-auto'>
                                        <p className='px-4 py-3 whitespace-pre-line'>
                                            Wireless Mouse — 18 orders<br />
                                            Gaming Keyboard — 15 orders<br />
                                            Laptop Stand — 22 orders<br />
                                            USB-C Cable — 13 orders<br />
                                            Bluetooth Speaker — 17 orders
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Databaseconfig
