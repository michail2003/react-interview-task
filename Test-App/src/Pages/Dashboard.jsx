import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Categories, JobSite } from '../DB'
import BlueWarningSVG from '../Components/BlueWarningSVG'
import SearchBar from '../Components/SearchBar'
import DropDownArrow from '../Components/DropDownArrow'
import CustomButton from '../Components/CustomButton'
import { Plus, X, Check } from 'lucide-react'

const Dashboard = () => {

  const [createModal, SetcreateModal] = useState(false)
  const [dropDown, SetdropDown] = useState(false)
  const [jobsites, Setjobsites] = useState([])
  const [fetch_sites_db, Setfetch_sites_db] = useState(false)
  const [categories, Setcategories] = useState([])
  const [categoriesSelected, SetcategoriesSelected] = useState([])
  const [statusDropdown, SetstatusDropdown] = useState(false)
  const [selectedStatus, SetselectedStatus] = useState()
  const [jobsiteName, SetjobsiteName] = useState()
  const [search_word, Setsearch_word] = useState("")
  const [ishovered, Setishovered] = useState()

  const statusCounts = {
    Completed: jobsites.filter(j => j.status === "Completed").length,
    OnRoad: jobsites.filter(j => j.status === "On Hold").length,
    OnHold: jobsites.filter(j => j.status === "On Hold_red").length,
  };

  const statuses = [
    { status: "Completed", color: "bg-lime-600/70" },
    { status: "On Hold", color: "bg-yellow-500/50" },
    { status: "In Progress", color: "bg-lime-600/40" },
  ]

  const tableStatuses = [
    { status: "Completed", color: "bg-lime-600/70" },
    { status: "On Hold", color: "bg-yellow-500/50" },
    { status: "In Progress", color: "bg-lime-600/40" },
    { status: "On Hold_red", color: "bg-red-500/80" },
  ]

  function category_push(value) {
    const match = categoriesSelected.some(c => (c.name == value.name))
    if (!match) {
      SetcategoriesSelected(prev => [...prev, value]);
    }
  }
  function remove_category(value) {
    const updated_list = categoriesSelected.filter(c => (c.name !== value.name))
    if (updated_list) {
      SetcategoriesSelected(updated_list)
    }
  }

  function fetch_categories() {

    const color_adding = (name) => {
      if (name === 'Sidewalk Shed') {
        return '#67AA3C';
      } else if (name === 'Scaffold') {
        return '#EFD652';
      } else {
        return '#9640BE';
      }
    };

    const formattedCategories = Categories.map(c => ({
      name: c.category_name,
      color: color_adding(c.category_name)
    }));
    Setcategories(formattedCategories);
  }

  function null_values() {

    SetcategoriesSelected([])
    SetselectedStatus(null)
    SetjobsiteName(null)
    SetcreateModal(false)
  }

  function fetch_jobsites() {
    const sites = JobSite.map(j => {
      const statusdata = tableStatuses.find(s => s.status === j.status);
      return {
        name: j.jobsite_name,
        status: j.status,
        statusColor: statusdata.color
      };
    });

    Setjobsites(sites.reverse());
  }

  function jobsiteAdd() {
    try {
      const categories_name = categoriesSelected.map(c => c.name)

      if (selectedStatus && categoriesSelected && jobsiteName) {
        JobSite.push({
          jobsite_name: jobsiteName,
          categories: categories_name,
          status: selectedStatus.status
        })
        null_values()
        Setfetch_sites_db(true)
        alert('Jobsite Added Succesfully');
      } else {
        alert('you should complete all the fields');
      }

    } catch (error) {
      console.log('unexpected error', error)
    }
  }

  const filteredJobsites = jobsites.filter(site =>
    site.name.toLowerCase().includes(search_word?.toLowerCase().trim())
  );

  useEffect(() => {
    fetch_categories()
    fetch_jobsites()
  }, []);

  useEffect(() => {
    if (fetch_sites_db === true) {
      fetch_jobsites()
      Setfetch_sites_db(false)
    }
  }, [fetch_sites_db]);

  return (
    <div className='bg-gray-300/10'>

      {/* status counter */}
      <div className='flex justify-around m-4 p-2 rounded-md bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.25)] h-20 gap-3'>
        <div className='bg-yellow-500/50 w-full p-2 rounded-md flex justify-center items-center text-white text-2xl'>
          {statusCounts.OnRoad} On Road
        </div>
        <div className='bg-lime-600/70 w-full p-2 rounded-md flex justify-center items-center text-white text-2xl'>
          {statusCounts.Completed} Completed
        </div>
        <div className='bg-red-500/80 w-full p-2 rounded-md flex justify-center items-center text-white text-2xl'>
          {statusCounts.OnHold} On Hold
        </div>
      </div>

      {/* jobsites grid */}
      <div className='flex flex-col m-4 rounded-md bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.25)]'>

        {/* header */}
        <div className='bg-[#F8F8FA] p-3 grid grid-cols-4 align-middle'>
          <h1 className='col-start-1 ml-2 font-Opensans font-semibold'>Title</h1>
        </div>

        {/* warning msg + searchbar + create button on grid */}
        <div className='bg-white p-2 grid grid-cols-3 items-center'>

          {/* warning SVG */}
          <div className='flex gap-2 col-start-1 text-sm ml-2'>
            <BlueWarningSVG></BlueWarningSVG>Informative piece of text that can be used regarding this modal.
          </div>

          {/* searchbar + createbutton */}
          <div className=' flex col-start-3 gap-4'>
            <SearchBar savepoint={Setsearch_word} />

            <CustomButton
              buttonFunction={() => SetcreateModal(true)}
              hoverColor={'#5bb037'}
              bgColor={'#68C142'}
              Icon={Plus}
              label={'Create'}
            />

          </div>
        </div>

        {/* jobsites table */}

        {/* headers */}
        <div className='bg-white p-1 grid grid-cols-4 items-center'>
          <h1 className=' col-start-2 font-bold'>Jobsite Name</h1>
          <h1 className=' font-bold col-start-4 ml-8'>status</h1>
        </div>

        {/* elements || cells */}

        {/* filtered items */}
        {filteredJobsites &&
          filteredJobsites.map((j, index) => (
            <Link to={`/jobsite/${j.name}`} key={index}>
              <div className={`${index % 2 ? 'bg-white' : 'bg-gray-100'} p-1 grid grid-cols-4 items-center`}>
                <h1 className='text-[#1264A3] font-semibold col-start-2'>{j.name}</h1>
                <h1 className={`${j.statusColor} text-white w-30 py-1 rounded text-center col-start-4`}>{j.status == "On Hold_red" ? "On Hold" : j.status}</h1>
              </div>
            </Link>

          ))

        }
      </div>


      {/* Modal*/}
      {createModal &&

        // modal blury effect
        <div className='flex justify-center items-center w-full h-full absolute top-0 bg-black/40 backdrop-blur-xs'
          onClick={() => SetcreateModal(false)}>

          {/* modal box */}
          <div className=' bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.25)] w-[50%] h-[50%] relative'
            onClick={(e) => {
              e.stopPropagation();
              SetdropDown(false);
              SetstatusDropdown(false)
            }}>

            {/* header and close button part  */}
            <div className='bg-gray-200/50 px-4 py-2 align-middle flex justify-between'>
              <h1 className='font-semibold'>Title</h1>
              <button className='cursor-pointer' onClick={() => SetcreateModal(false)}>
                <X />
              </button>
            </div>

            {/* the rest of the modal */}
            <div className='flex flex-col gap-4 m-4'>

              {/* warning message */}
              <div className='flex gap-2 text-sm'>
                <BlueWarningSVG></BlueWarningSVG>
                <p>Informative piece of text that can be used regarding this modal.</p>
              </div>

              {/* name input field */}
              <div className='flex flex-col'>
                <label htmlFor="name" className='w-fit ml-4 mb-0.5'>Name</label>
                <input
                  type="text" id="name"
                  className=' placeholder-gray-300 bg-gray-200/50 outline-none rounded-sm py-1.5 px-2'
                  placeholder="Type the jobsite's name"
                  onChange={(e) => SetjobsiteName(e.target.value)} />
              </div>

              {/* category dropdown + categories selected + status dropdown*/}
              <div className='flex gap-2'>

                {/* category custom dorpdown */}
                <div className='flex flex-col flex-8'>
                  <h1 className='w-fit ml-4 mb-0.5'>Category Included</h1>

                  <div className='outline-none'>
                    <div className='bg-gray-200/50 py-1.5 text-gray-300 flex justify-between px-2'
                      onClick={(e) => { e.stopPropagation(); SetdropDown(!dropDown) }}>

                      {categoriesSelected.length === 3 ? <p>All of them selected</p> : <p>Select</p>}
                      <button className={dropDown ? 'rotate-180' : ''}>
                        <DropDownArrow />
                      </button>
                    </div>

                    {/* dropdown options */}

                    {dropDown &&
                      <ul className="shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]">
                        {categories.map((c, index) => {
                          const isSelected = categoriesSelected.some(
                            selected => selected.name === c.name
                          );

                          return (
                            <li
                              key={index}
                              onClick={() => {
                                Setishovered(null)
                                if (isSelected) {
                                  SetcategoriesSelected(prev => prev.filter(cat => cat.name !== c.name));
                                } else {
                                  SetcategoriesSelected(prev => [...prev, { name: c.name, color: c.color }]);
                                }
                              }}
                              onMouseEnter={() => { if (!isSelected) { Setishovered(c.name) } }}
                              onMouseLeave={() => Setishovered(null)}
                              style={{
                                backgroundColor: isSelected || ishovered === c.name ? c.color : '',
                              }}

                              className="flex justify-between px-2 py-1 border-b-2 group border-gray-200/50 font-light cursor-pointer"
                            >
                              <h3 className={isSelected || ishovered === c.name ? 'text-white' : 'text-gray-900'}>
                                {c.name}
                              </h3>

                              {isSelected || ishovered === c.name ? <Check color="white" /> : ""}
                            </li>
                          );
                        })}
                      </ul>

                    }

                  </div>

                  {/* selected categories  */}

                  {!dropDown && categoriesSelected.length > 0 &&

                    <div className='flex gap-8 w-fit mt-4'>
                      {categoriesSelected.map((c, index) => (
                        <div key={index} className='flex items-center gap-2'>

                          <span style={{ backgroundColor: c.color }} className="h-3 w-3 rounded-full inline-block"></span>
                          <h3>{c.name}</h3>
                          <button onClick={() => remove_category(c)} className='bg-red-500/80 cursor-pointer'><X color='white' size={20} /></button>

                        </div>
                      ))}

                    </div>
                  }

                </div>
                {/* status dropdown */}

                <div className='flex flex-col flex-3'>
                  <h1 className='w-fit ml-4 mb-0.5'>Status</h1>

                  <div className='outline-none'>

                    {selectedStatus && !statusDropdown ? (

                      <div className='bg-gray-200/50 py-1.5 text-gray-900 flex justify-between px-2'
                        onClick={(e) => { e.stopPropagation(); SetstatusDropdown(!statusDropdown) }}>

                        <div className='flex items-center gap-2'>
                          <span className={`h-3 w-3 rounded-full inline-block ${selectedStatus.color}`}></span>
                          <h3>{selectedStatus.status}</h3>
                        </div>

                        <button className={statusDropdown ? 'rotate-180' : ''}>
                          <DropDownArrow />
                        </button>
                      </div>

                    ) : (<div className='bg-gray-200/50 py-1.5 text-gray-300 flex justify-between px-2'
                      onClick={(e) => { e.stopPropagation(); SetstatusDropdown(!statusDropdown) }}>

                      {selectedStatus ? <h3>{selectedStatus.status}</h3> : <h3>Select one</h3>}
                      <button className={statusDropdown ? 'rotate-180' : ''}>
                        <DropDownArrow />
                      </button>
                    </div>)}




                    {/* status dropdown options */}
                    {
                      statusDropdown &&
                      <ul className="shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]">
                        {statuses.map((s, index) => {
                          const isSelected = selectedStatus?.status === s.status;

                          return (
                            <li
                              key={index}
                              onMouseEnter={() => { if (!isSelected) { Setishovered(s.status) } }}
                              onMouseLeave={() => Setishovered(null)}
                              onClick={() => { SetselectedStatus({ status: s.status, color: s.color }), SetstatusDropdown(false) }}
                              className={`flex justify-between px-2 py-1 ${isSelected? selectedStatus.color : ""} ${ishovered === s.status? s.color:""} border-b-2 group border-gray-200/50 font-light cursor-pointer`}
                            >
                              <h3 className={isSelected || ishovered == s.status ? 'text-white' : 'text-gray-900'}>
                                {s.status}
                              </h3>

                            </li>
                          );
                        })}
                      </ul>

                    }

                  </div>

                </div>

              </div>



            </div>
            <div className='absolute bottom-0 right-0 m-6 flex gap-10 h-10'>
              <CustomButton
                buttonFunction={jobsiteAdd}
                hoverColor={'#5bb037'}
                bgColor={'#68C142'}
                Icon={Check}
                label={'Save Changes'}
              />

              <CustomButton
                buttonFunction={null_values}
                hoverColor={'#EB4345'}
                bgColor={'#FE4C4A'}
                Icon={X}
                label={'Cancel Changes'}
              />
            </div>
          </div>
        </div>
      }

    </div >
  )
}

export default Dashboard