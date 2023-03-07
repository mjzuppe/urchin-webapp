// Styles
import classes from './Breadcrumbs.module.scss';

interface BreadcrumbsProps {
  section: string;
  title: string;
}

const Breadcrumbs = ({ section, title }: BreadcrumbsProps): JSX.Element => {
  return (
    <div className={classes.breadcrumbs_section}>
      <p>
        <span className={classes.section_text}>{section}</span> {''}
        <span>&gt;</span> {''}
        <span className={classes.title_text}>{title}</span>
      </p>
    </div>
  );
};

export default Breadcrumbs;
