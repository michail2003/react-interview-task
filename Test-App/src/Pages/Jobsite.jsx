import React, { use, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Categories, JobSite } from '../DB'
import CustomButton from '../Components/CustomButton'
import { ArrowLeft, Check, X } from 'lucide-react'
import NoServiceSelected from '../Assets/NoServiceSelected.png'
import DropDownArrow from '../Components/DropDownArrow'
import BlueWarningSVG from '../Components/BlueWarningSVG'
import SearchBar from '../Components/SearchBar'
const Jobsite = () => {
  const [selectedCategory, SetselectedCategory] = useState()
  const [jobside, Setjobside] = useState([])
  const [categoryData, SetcategoryData] = useState([])
  const [hovered, Sethovered] = useState()
  const [cellModal, SetcellModal] = useState(false)
  const [itemsDropDown, SetitemsDropDown] = useState(false)
  const [selectedItem, SetselectedItem] = useState()
  const [modifiedItem, SetmodifiedItem] = useState()
  const [itemSearched, SetitemSearched] = useState("")
  const { name } = useParams();

  function fetch_data() {
    const found = JobSite.find(j => j.jobsite_name === name);

    if (!found) return;

    const get_color = (category) => {
      if (category === "Sidewalk Shed") return "#67AA3C";
      if (category === "Scaffold") return "#EFD652";
      return "#9640BE";
    };

    const formattedData = {
      name: found.jobsite_name,
      categories: found.categories.map(cat => ({
        category: cat,
        color: get_color(cat)
      })),
      updated_items: found.updated_items
    };

    Setjobside(formattedData);
  }


  function getFinalCategoryItems(categoryName) {

    const category = Categories.find(c => c.category_name === categoryName);
    if (!category) return [];

    const finalData = category.items.map(item => {
      const update = jobside?.updated_items?.find(u => u.id === item.id);

      return {
        id: item.id,
        item_name: item.item_name,
        quantity: update?.quantity_updated || item.default_quantity,
        description: update?.description_updated || item.description,
        notes: update?.notes_updated || item.notes,
      };
    });
    SetcategoryData(finalData)
    SetselectedCategory(categoryName)
  };

  function updateItem(modifiedItem) {

    jobside.updated_items = jobside.updated_items || [];

    const existingItem = jobside.updated_items.find(item => item.id === modifiedItem.id);

    if (existingItem) {
      Object.assign(existingItem, modifiedItem);
    } else {
      jobside.updated_items.push(modifiedItem);
    }
    getFinalCategoryItems(selectedCategory)
  }


  const filteredItems = categoryData.filter(item =>
    item.item_name.toLowerCase().includes(itemSearched?.toLowerCase().trim())
  );
  useEffect(() => {
    fetch_data()
  }, [])
  return (
    <div >
      <div className='flex m-4 gap-4 h-[60vh]'>
        <div className='flex flex-col w-1/5 relative rounded-md bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.25)]'>
          <h1 className='bg-[#F8F8FA] p-2 font-semibold text-base'>{jobside.name}</h1>
          <div className='m-4 flex flex-col gap-4'>
            {jobside &&
              jobside.categories?.map((cat, index) => (

                <button
                  key={index}
                  onClick={() => getFinalCategoryItems(cat.category)}
                  onMouseEnter={() => {
                    if (selectedCategory !== cat.category) {
                      Sethovered(cat.category);
                    }
                  }}
                  onMouseLeave={() => {
                    if (selectedCategory !== cat.category) {
                      Sethovered(null);
                    }
                  }}
                  style={{
                    backgroundColor:
                      cat.category === selectedCategory || cat.category === hovered
                        ? cat.color
                        : "#F8F8FA",
                    color:
                      cat.category === selectedCategory || cat.category === hovered
                        ? "white"
                        : "black",
                  }}
                  className="px-4 py-2 text-base text-center rounded-lg flex justify-between items-center cursor-pointer transition-colors duration-200"
                >
                  {cat.category}

                  {selectedCategory == cat.category ? <Check color="white" /> : ''}
                </button>

              ))
            }
          </div>

          <Link to={'/'} className='flex justify-center absolute bottom-0 w-full mb-5'>
            <CustomButton
              bgColor={'#1264A3'}
              hoverColor={"#0F5C97"}
              label={"Go Back"}
              Icon={ArrowLeft} />
          </Link>

        </div>
        <div className='flex flex-col relative w-full rounded-md bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.25)]'>
          <div className='flex justify-between bg-[#F8F8FA]'>
            <h1 className=' p-2 px-4 text-base'>{selectedCategory ? selectedCategory : "Data Grid"}</h1>
            <div className='flex items-center w-1/3 gap-5  p-2'>
              <SearchBar savepoint={SetitemSearched} />
              <X className='cursor-pointer'
                onClick={() => { SetselectedCategory(null), SetcategoryData([]), Sethovered(null) }} />
            </div>
          </div>

          {filteredItems && filteredItems.length > 0 && (
            <>
              <div className='bg-white grid grid-cols-[0.5fr_0.5fr_0.5fr_3fr_3fr] items-center p-4'>
                <h1 className='font-semibold text-base text-center'>Nr.</h1>
                <h1 className='font-semibold text-base text-center'>Item</h1>
                <h1 className='font-semibold text-base text-center'>Quantity</h1>
                <h1 className='font-semibold text-base text-center'>Description</h1>
                <h1 className='font-semibold text-base text-center'>Notes</h1>
              </div>

              {filteredItems.map((d, index) => (
                <div className={`${index % 2 ? 'bg-white' : 'bg-gray-100'} grid grid-cols-[0.5fr_0.5fr_0.5fr_3fr_3fr] items-center p-2 gap-2`}
                  onClick={() => { SetcellModal(true), SetselectedItem(d) }}>
                  <h1 className='text-base text-center'>{index + 1}</h1>
                  <h1 className='text-base text-center'>{d.item_name}</h1>
                  <h1 className='text-base text-center'>{d.quantity}</h1>
                  <h1 className='text-base text-center'>{d.description}</h1>
                  <h1 className='text-base text-center'>{d.notes}</h1>
                </div>
              ))}
            </>
          )
          }



          {!selectedCategory &&
            <div className='w-full h-full flex flex-col items-center justify-center'>
              <img src={NoServiceSelected} alt="" width={200} height={200} />
              <h3 className='font-base font-semibold'>No Service Selected </h3>
              <h3 className='font-base font-semibold'>Please select a service on your left to proceed. </h3>
            </div>
          }


        </div>
      </div>

      {cellModal &&
        <div className='flex justify-center items-center w-full h-full absolute top-0 bg-black/40 backdrop-blur-sm'
          onClick={() => SetcellModal(false)}>

          <div className=' bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.25)] w-[50%] h-[65%] relative'
            onClick={(e) => {
              e.stopPropagation();
            }}>

            <div className='bg-gray-200/50 px-4 py-2 align-middle flex justify-between'>
              <h1 className='font-semibold'>Title</h1>
              <button className='cursor-pointer' onClick={() => SetcellModal(false)}>
                <X />
              </button>
            </div>


            <div className='flex flex-col gap-4 m-4'>

              <div className='flex gap-2 text-sm'>
                <BlueWarningSVG></BlueWarningSVG>
                <p>Informative piece of text that can be used regarding this modal.</p>
              </div>

              <div className='flex justify-between w-full gap-5'>


                <div className='flex flex-col w-1/2 relative'>
                  <h3 className='w-fit ml-4 mb-0.5'>Item</h3>
                  <div className='bg-gray-200/50 py-1.5 text-gray-300 flex justify-between px-2 rounded-sm'
                    onClick={(e) => { e.stopPropagation(); SetitemsDropDown(!itemsDropDown) }}>

                    <h3>{selectedItem ? selectedItem.item_name : 'Search and select item'}</h3>
                    <button className={itemsDropDown ? 'rotate-180' : ''}>
                      <DropDownArrow />
                    </button>
                  </div>


                  {itemsDropDown &&
                    <ul className="shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] absolute w-full top-full bg-white">
                      {categoryData.map((item, index) => (

                        <li
                          key={index}
                          onClick={() => { SetselectedItem(item), SetitemsDropDown(false) }}
                          className="flex justify-between px-2 py-1 border-b-2 group border-gray-200/50 font-light cursor-pointer"
                        >
                          <h3 className=''>
                            {item.item_name}
                          </h3>
                        </li>

                      ))}
                    </ul>
                  }
                </div>

                <div className='flex flex-col w-1/2'>
                  <label htmlFor="quantity" className='w-fit ml-4 mb-0.5'>Quantity</label>
                  <input
                    type="number" id="quantity"
                    className=' placeholder-gray-300 bg-gray-200/50 outline-none rounded-sm py-1.5 px-2'
                    placeholder="Set Quantity"
                    min={1}
                    onChange={(e) =>
                      SetmodifiedItem(prev => ({
                        ...prev,
                        id: selectedItem.id,
                        quantity_updated: Number(e.target.value)
                      }))
                    }

                  />
                </div>
              </div>
              <div className='flex flex-col'>
                <label htmlFor="description" className='w-fit ml-4 mb-0.5'>Description</label>
                <textarea
                  id="description"
                  className='bg-gray-200/50 h-30 px-4 py-2 resize-none rounded-lg outline-none'
                  placeholder='Type the description...'
                  onChange={(e) =>
                    SetmodifiedItem(prev => ({
                      ...prev,
                      id: selectedItem.id,
                      description_updated: String(e.target.value)
                    }))
                  }
                ></textarea>
              </div>

              <div className='flex flex-col'>
                <label htmlFor="note" className='w-fit ml-4 mb-0.5'>Notes</label>
                <textarea
                  id="note"
                  className='bg-gray-200/50 h-30 px-4 py-2 resize-none rounded-lg outline-none'
                  placeholder='Type a note...'
                  onChange={(e) =>
                    SetmodifiedItem(prev => ({
                      ...prev,
                      id: selectedItem.id,
                      notes_updated: String(e.target.value)
                    }))
                  }
                ></textarea>
              </div>

              <div className='absolute right-0 bottom-0 m-4'>
                <CustomButton
                  hoverColor={'#5bb037'}
                  bgColor={'#68C142'}
                  Icon={Check}
                  label={'Save Changes'}
                  buttonFunction={() => {
                    if (modifiedItem) {
                      updateItem(modifiedItem);
                    }
                    SetcellModal(false);
                  }}
                />
              </div>

            </div>
          </div>
        </div>
      }

    </div >
  )
}

export default Jobsite