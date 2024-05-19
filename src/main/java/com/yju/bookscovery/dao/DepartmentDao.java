package com.yju.bookscovery.dao;

import com.yju.bookscovery.dto.DepartmentDto;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DepartmentDao {
    @Autowired
    SqlSession session;

    String namespace="com.yju.bookscovery.dao.DepartmentMapper.";

    public int countDepartment() throws Exception{
        return session.selectOne(namespace+"count");
    }
    public DepartmentDto selectDepartment(Integer department_id)throws Exception{
        return session.selectOne(namespace+"selectOne", department_id);
    }
    public List<DepartmentDto> selectAllDepartment()throws Exception{
        return session.selectList(namespace+"selectAll");
    }
    public int insertDepartment(DepartmentDto dto)throws Exception{
        return session.insert(namespace+"insert",dto);
    }
    public int updateDepartment(DepartmentDto dto)throws Exception{
        return session.update(namespace+"update",dto);
    }
    public int deleteDepartment(Integer department_id)throws Exception{
        return session.delete(namespace+"deleteOne",department_id);
    }
    public int deleteAllDepartment()throws Exception{
        return session.delete(namespace+"deleteAll");
    }
}
