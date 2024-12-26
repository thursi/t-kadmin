import React from 'react';
import { Button } from 'components';
import { withFormik, FormikProps, FieldArray } from 'formik';
import { useSelector } from 'react-redux';
import { RootState } from 'store/reducer';
import { string, object, number, array } from 'yup';

export interface IFormProps {
  onSubmit: (values: any, actions: any) => void;
  item?: any;
  setModal?: any;
}

interface TimeSlot {
  startTime: string;
  endTime: string;
  deliveryCount: number;
}

interface DayAllocation {
  day: string;
  timeSlots: TimeSlot[];
}

interface FormikValues {
  dayAllocations: DayAllocation[];
}

const DAYS = [
  { value: '', label: 'Select Day' },
  { value: 'MONDAY', label: 'Monday' },
  { value: 'TUESDAY', label: 'Tuesday' },
  { value: 'WEDNESDAY', label: 'Wednesday' },
  { value: 'THURSDAY', label: 'Thursday' },
  { value: 'FRIDAY', label: 'Friday' },
  { value: 'SATURDAY', label: 'Saturday' },
  { value: 'SUNDAY', label: 'Sunday' },
];

function DynamicAllocationForm(props: FormikProps<FormikValues> & IFormProps) {
  const { cityLoading } = useSelector((state: RootState) => state.city);

  if (props?.isSubmitting || cityLoading) {
    return <div>Loading...</div>;
  }

  async function cancelForm() {
    props?.setModal(false);
    props?.resetForm();
  }

  return (
    <form onSubmit={props.handleSubmit} className="space-y-4">
      <FieldArray name="dayAllocations">
        {({ push: pushDay, remove: removeDay }) => (
          <div>
            {props.values.dayAllocations.map((dayAllocation, dayIndex) => (
              <div key={dayIndex} className="border p-4 rounded-md mb-4">
                {/* Day Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Select Day:
                  </label>
                  <select
                    name={`dayAllocations.${dayIndex}.day`}
                    value={dayAllocation.day}
                    onChange={props.handleChange}
                    className="w-full border rounded-md p-2"
                  >
                    {DAYS.map((day) => (
                      <option key={day.value} value={day.value}>
                        {day.label}
                      </option>
                    ))}
                  </select>
                </div>

                <FieldArray name={`dayAllocations.${dayIndex}.timeSlots`}>
                  {({ push: pushTimeSlot, remove: removeTimeSlot }) => (
                    <div>
                      {dayAllocation.timeSlots.map((_, timeIndex) => (
                        <div
                          key={timeIndex}
                          className="bg-gray-50 p-3 rounded-md mb-3 border"
                        >
                          <div className="mb-2 flex space-x-4">
                            <div className="flex-1">
                              <label className="block text-sm">
                                Start Time:
                              </label>
                              <input
                                type="time"
                                name={`dayAllocations.${dayIndex}.timeSlots.${timeIndex}.startTime`}
                                value={
                                  dayAllocation.timeSlots[timeIndex].startTime
                                }
                                onChange={props.handleChange}
                                className="w-full border rounded-md p-2"
                              />
                            </div>

                            <div className="flex-1">
                              <label className="block text-sm">End Time:</label>
                              <input
                                type="time"
                                name={`dayAllocations.${dayIndex}.timeSlots.${timeIndex}.endTime`}
                                value={
                                  dayAllocation.timeSlots[timeIndex].endTime
                                }
                                onChange={props.handleChange}
                                className="w-full border rounded-md p-2"
                              />
                            </div>

                            <div className="flex-1">
                              <label className="block text-sm">
                                Delivery Count:
                              </label>
                              <input
                                type="number"
                                name={`dayAllocations.${dayIndex}.timeSlots.${timeIndex}.deliveryCount`}
                                value={
                                  dayAllocation.timeSlots[timeIndex]
                                    .deliveryCount
                                }
                                onChange={props.handleChange}
                                className="w-full border rounded-md p-2"
                              />
                            </div>
                          </div>

                          {dayAllocation.timeSlots.length > 1 && (
                            <div className="flex justify-end mt-4">
                              <Button
                                type="button"
                                name="Remove Time Slot"
                                className="text-sm text-white bg-red-500 py-2 px-4 rounded-md"
                                onClick={() => removeTimeSlot(timeIndex)}
                              />
                            </div>
                          )}
                        </div>
                      ))}

                      <div className="flex justify-end mt-4 ">
                        <Button
                          type="button"
                          name="Add Time Slot"
                          className="text-sm text-white bg-green-500 py-2 px-4 rounded-md"
                          onClick={() =>
                            pushTimeSlot({
                              startTime: '',
                              endTime: '',
                              deliveryCount: 0,
                            })
                          }
                        />
                      </div>
                    </div>
                  )}
                </FieldArray>

                {props.values.dayAllocations.length > 1 && (
                  <div className="flex justify-end mt-4 pr-4">
                    <Button
                      type="button"
                      name="Remove Day"
                      className="text-sm text-white bg-red-600 py-2 px-4 rounded-md"
                      onClick={() => removeDay(dayIndex)}
                    />
                  </div>
                )}
              </div>
            ))}

            <div className="flex justify-end mt-4 pr-4">
              <Button
                type="button"
                name="Add Day"
                className="text-sm text-white bg-blue-500 py-2 px-4 rounded-md"
                onClick={() =>
                  pushDay({
                    day: '',
                    timeSlots: [
                      { startTime: '', endTime: '', deliveryCount: 0 },
                    ],
                  })
                }
              />
            </div>
          </div>
        )}
      </FieldArray>
      <div className="flex justify-end py-8  w-full  items-center gap-4 pr-4">
        <div>
          <Button
            onClick={cancelForm}
            name={'Cancel'}
            className={
              'text-sm text-black bg-white text-center font-[500] p-2 w-[65px] rounded-md border-[1px] border-black cursor-pointer'
            }
          />
        </div>
        <div>
          <Button
            type="submit"
            name="Submit"
            className="text-sm text-white bg-blue-500  py-2 px-4 rounded-md"
            loading={props.isSubmitting}
          />
        </div>
      </div>
    </form>
  );
}

export default withFormik<IFormProps, FormikValues>({
  // Validation Schema
  validationSchema: object().shape({
    dayAllocations: array()
      .of(
        object().shape({
          day: string().required('Day is required'),
          timeSlots: array()
            .of(
              object().shape({
                startTime: string().required('Start time is required'),
                endTime: string().required('End time is required'),
                deliveryCount: number()
                  .required('Delivery count is required')
                  .min(0, 'Delivery count cannot be negative'),
              })
            )
            .min(1, 'At least one time slot is required'),
        })
      )
      .min(1, 'At least one day is required'),
  }),

  // Initial Values
  mapPropsToValues: ({ item }: IFormProps) => ({
    dayAllocations: item?.dayAllocations?.length
      ? item.dayAllocations
      : [
          {
            day: '',
            timeSlots: [{ startTime: '', endTime: '', deliveryCount: 0 }],
          },
        ],
  }),


  // handleSubmit: (values, { props, ...actions }) => {
  //   const formattedPayload = {
  //     businessLocationId: props.item?.id || 0,
  //     dayAllocationRequestList: values.dayAllocations.map((allocation) => ({
  //       day: allocation.day,
  //       timeSlots: allocation.timeSlots.map((slot) => ({
  //         startTime: slot.startTime,
  //         endTime: slot.endTime,
  //         deliveryCount: slot.deliveryCount,
  //       })),
  //     })),
  //   };

  //   props.onSubmit(formattedPayload, actions);
  //   actions.setSubmitting(false);
  // },


  handleSubmit: (values, { props, ...actions }) => {
    const formattedPayload = {
      businessLocationId: props.item?.id || 0,
      dayAllocationRequestList: values.dayAllocations.map((allocation) => ({
        day: allocation.day,
        timeSlots: allocation.timeSlots.map((slot) => ({
          startTime: slot.startTime,
          endTime: slot.endTime,
          deliveryCount: slot.deliveryCount,
        })),
      })),
    };
  

    props.onSubmit(formattedPayload, actions);
  

    if (props.setModal) {
      props.setModal(false);
    }
  
    actions.setSubmitting(false); 
  },
  

  enableReinitialize: true,
  validateOnBlur: false,
})(DynamicAllocationForm);
