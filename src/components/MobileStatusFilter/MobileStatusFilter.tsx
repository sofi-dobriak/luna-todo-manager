import { useDispatch, useSelector } from 'react-redux';
import styles from './MobileStatusFilter.module.css';
import { resetStatusFilter, updateStatusFilter } from '../../redux/filterSlice/slice';
import Button from '../Button/Button';
import { selectFilters } from '../../redux/filterSlice/selectors';

const MobileStatusFilter = () => {
  const dispatch = useDispatch();
  const { status } = useSelector(selectFilters);

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(updateStatusFilter(event.target.value));
  };

  const handleResetStatusFilter = (): void => {
    dispatch(resetStatusFilter());
  };

  return (
    <div className={styles.formButtonContainer}>
      <div className={styles.radioInputs}>
        <label className={styles.radio}>
          <input
            type='radio'
            name='radio'
            value='Створено'
            checked={status === 'Створено'}
            onChange={handleStatusChange}
          />
          <span className={styles.name}>Створено</span>
        </label>
        <label className={styles.radio}>
          <input
            type='radio'
            name='radio'
            value='В роботі'
            checked={status === 'В роботі'}
            onChange={handleStatusChange}
          />
          <span className={styles.name}>В роботі</span>
        </label>

        <label className={styles.radio}>
          <input
            type='radio'
            name='radio'
            value='Зупинено'
            checked={status === 'Зупинено'}
            onChange={handleStatusChange}
          />
          <span className={styles.name}>Зупинено</span>
        </label>

        <label className={styles.radio}>
          <input
            type='radio'
            name='radio'
            value='Продовжено'
            checked={status === 'Продовжено'}
            onChange={handleStatusChange}
          />
          <span className={styles.name}>Продовжено</span>
        </label>

        <label className={styles.radio}>
          <input
            type='radio'
            name='radio'
            value='Завершено'
            checked={status === 'Завершено'}
            onChange={handleStatusChange}
          />
          <span className={styles.name}>Завершено</span>
        </label>

        <label className={styles.radio}>
          <input
            type='radio'
            name='radio'
            value='Видалено'
            checked={status === 'Видалено'}
            onChange={handleStatusChange}
          />
          <span className={styles.name}>Видалено</span>
        </label>
      </div>
      <Button onClick={handleResetStatusFilter} className={styles.resetStatusFilterButton}>
        Скинути
      </Button>
    </div>
  );
};

export default MobileStatusFilter;
