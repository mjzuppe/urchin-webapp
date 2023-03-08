// Styles
import classes from './Breadcrumbs.module.scss';

interface BreadcrumbsProps {
  section: string;
  title: string;
}

const Breadcrumbs = ({ section, title }: BreadcrumbsProps): JSX.Element => {
  return (
    <div className={classes.breadcrumbs_section}>
      <p className={classes.section_text}>{section}</p> {''}
      <p>&gt;</p> {''}
      <p className={classes.title_text}>{title}</p>
    </div>
  );
};

export default Breadcrumbs;
