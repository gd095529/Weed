package com.yju.bookscovery.service;

import com.yju.bookscovery.dao.BookCountDao;
import com.yju.bookscovery.dao.DepartmentDao;
import com.yju.bookscovery.dao.MemberDao;
import com.yju.bookscovery.dto.DepartmentDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DepartmentService {
    @Autowired
    DepartmentDao departmentDao;

    @Autowired
    MemberDao memberDao;

    @Autowired
    BookCountDao bookCountDao;

    public DepartmentDto select(Integer department_id) throws Exception{
        return departmentDao.selectDepartment(department_id);
    }

    public int insert(DepartmentDto dto) throws Exception{
        return departmentDao.insertDepartment(dto);
    }

    public int update(DepartmentDto dto) throws Exception{
        return departmentDao.updateDepartment(dto);
    }

    @Transactional(rollbackFor = Exception.class)
    public int delete(Integer department_id)throws Exception{
        //아마 같은학과인 멤버 선택해서 -> 모두 학과 변경, 학과별 도서 검색 횟수에는 남길까..?

        return departmentDao.deleteDepartment(department_id);
    }

    public List<DepartmentDto> selectAll() throws Exception{
        return departmentDao.selectAllDepartment();
    }

}
