/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
export function formatDateTime(date: Date) {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();
  let hour = String(d.getHours());
  let m = String(d.getMinutes());
  let s = String(d.getSeconds());

  if (day.length < 2) day = '0' + day;

  return (
    [year, padding(month), padding(day)].join('-') +
    '_' +
    [padding(hour), padding(m), padding(s)].join('-')
  );
}

function padding(str: string) {
  if (str.length < 2) {
    str = '0' + str;
  }
  return str;
}
