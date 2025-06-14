import { useDispatch, useSelector } from 'react-redux';
import styles from './TotalAnalyticTable.module.css';
import { selectTaskStatusCountsWithDateRange } from '../../redux/tasksSlice/selectors';
import { useEffect, useState } from 'react';
import { updateDataFilter } from '../../redux/filterSlice/slice';
import { selectFiltersDate } from '../../redux/filterSlice/selectors';
import { closeModal, openModal } from '../../redux/modalSlice/slice';

const TotalAnalyticTable = () => {
  const dispatch = useDispatch();
  const taskStatusCounts = useSelector(selectTaskStatusCountsWithDateRange);
  const dateRangeFilters = useSelector(selectFiltersDate);

  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  let timeoutId: number;

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newStartDate: string = event.target.value;

    if (endDate && new Date(newStartDate) > new Date(endDate)) {
      dispatch(openModal({ modalKey: 'isErrorMessageModalOpen' }));

      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout((): void => {
        dispatch(closeModal('isErrorMessageModalOpen'));
      }, 2500);

      return;
    }

    setStartDate(newStartDate);

    dispatch(
      updateDataFilter({
        start: newStartDate,
        end: endDate,
      })
    );
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newEndDate: string = event.target.value;

    if (startDate && new Date(newEndDate) < new Date(startDate)) {
      dispatch(openModal({ modalKey: 'isErrorMessageModalOpen' }));

      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout((): void => {
        dispatch(closeModal('isErrorMessageModalOpen'));
      }, 2500);

      return;
    }

    setEndDate(newEndDate);

    dispatch(
      updateDataFilter({
        start: startDate,
        end: newEndDate,
      })
    );
  };

  useEffect(() => {
    setStartDate(dateRangeFilters.start || '');
    setEndDate(dateRangeFilters.end || '');
  }, [dateRangeFilters.start, dateRangeFilters.end]);

  return (
    <div className={styles.tableContainer} id='footer'>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.th}>Обраний період</th>
            <th className={styles.th}>Створено</th>
            <th className={styles.th}>В роботі</th>
            <th className={styles.th}>Зупинено</th>
            <th className={styles.th}>Продовжено</th>
            <th className={styles.th}>Завершено</th>
            <th className={styles.th}>Видалено</th>
          </tr>
        </thead>
        <tbody>
          <tr className={`${styles.taskItem} ${styles.taskDate}`}>
            <td className={styles.taskText}>
              <label className={styles.label}>
                <span>Від</span>
                <input type='date' value={startDate} onChange={handleStartDateChange} />
              </label>
            </td>
            <td className={styles.taskText} rowSpan={2}>
              {taskStatusCounts.created}
            </td>
            <td className={styles.taskText} rowSpan={2}>
              {taskStatusCounts.inProgress}
            </td>
            <td className={styles.taskText} rowSpan={2}>
              {taskStatusCounts.stopped}
            </td>
            <td className={styles.taskText} rowSpan={2}>
              {taskStatusCounts.continued}
            </td>
            <td className={styles.taskText} rowSpan={2}>
              {taskStatusCounts.completed}
            </td>
            <td className={styles.taskText} rowSpan={2}>
              {taskStatusCounts.deleted}
            </td>
          </tr>
          <tr className={styles.taskItem}>
            <td className={`${styles.taskText} ${styles.second} ${styles.taskDate}`}>
              <label className={styles.label}>
                <span>До</span>
                <input type='date' value={endDate} onChange={handleEndDateChange} />
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TotalAnalyticTable;
