const Helper = {};

Helper.dateFormat = (arg) => {
  let d = new Date(arg);
  return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
};

Helper.getDateRange = () => {
    let todayDate = new Date();
    let priorDate = new Date();
    priorDate.setDate(priorDate.getDate() - 30);

    return {
      'start': Helper.dateFormat(priorDate),
      'end': Helper.dateFormat(todayDate)
    };
  };

export default Helper;

